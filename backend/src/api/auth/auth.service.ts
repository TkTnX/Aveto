import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { Response } from 'express'
import { User } from 'generated/prisma/client'
import { LoginRequest, RegisterRequest } from 'src/api/auth/dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService
	) {}

	public async register(res: Response, dto: RegisterRequest) {
		const phoneRegex = /^\+7\d{10}$/
		const type = phoneRegex.test(dto.emailOrPhone) ? 'phone' : 'email'

		const hashedPassword = await argon2.hash(dto.password)

		const newUser = await this.prismaService.user.create({
			data: {
				name: dto.name,
				// TODO: ADD AVATARS,
				// avatar,
				[type]: dto.emailOrPhone,
				password: hashedPassword
			}
		})

		return this.auth(res, newUser)
	}

	public async login(res: Response, dto: LoginRequest) {
		const phoneRegex = /^\+7\d{10}$/
		const type = phoneRegex.test(dto.emailOrPhone) ? 'phone' : 'email'

		const user = await this.prismaService.user.findFirst({
			where: {
				[type]: dto.emailOrPhone
			}
		})

		if (!user) throw new NotFoundException('Неверные данные!')

		const verifyPassword = await argon2.verify(user.password, dto.password)
		if (!verifyPassword) throw new UnauthorizedException('Неверные данные!')

		return this.auth(res, user)
	}

	private async generateTokens(user: User) {
		const payload = {
			userId: user.id,
			email: user.email,
			phone: user.phone
		}
		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: '7d'
		})
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: '2h'
		})
		return {
			accessToken,
			refreshToken
		}
	}

	private async auth(res: Response, user: User) {
		const { accessToken, refreshToken } = await this.generateTokens(user)

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 60480000,
		})

		return { accessToken }
	}
}
