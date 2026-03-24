import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { Request, Response } from 'express'
import { User } from 'generated/prisma/client'
import {
	LoginRequest,
	RegisterRequest,
	ResetPasswordReqest,
	SendCodeRequest,
	VerifyCodeRequest
} from 'src/api/auth/dto'
import { EmailService } from 'src/api/email/email.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
		private readonly emailService: EmailService
	) {}

	public async register(res: Response, dto: RegisterRequest) {
		const phoneRegex = /^\+7\d{10}$/
		const type = phoneRegex.test(dto.emailOrPhone) ? 'phone' : 'email'

		const hashedPassword = await argon2.hash(dto.password)

		const newUser = await this.prismaService.user.create({
			data: {
				name: dto.name,
				isEmailVerified: true,
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

		if (user.password) {
			const verifyPassword = await argon2.verify(
				user.password,
				dto.password
			)
			if (!verifyPassword)
				throw new UnauthorizedException('Неверные данные!')
		}

		return this.auth(res, user)
	}

	public async logout(res: Response) {
		res.clearCookie('refreshToken')

		return { ok: true }
	}

	public async sendCode(dto: SendCodeRequest, type: string) {
		const now = new Date()
		const { email } = dto

		const isEmailExists = await this.prismaService.user.findUnique({
			where: { email }
		})

		if (isEmailExists && type === 'confirm')
			throw new UnauthorizedException('Почта занята!')

		if (type === 'reset' && !isEmailExists)
			throw new NotFoundException('Пользователь не найден!')

		const code = Math.floor(1000 + Math.random() * 1000000).toString()
		await this.prismaService.code.create({
			data: {
				code,
				expiresAt: new Date(now.setMinutes(now.getMinutes() + 5))
			}
		})

		if (type === 'confirm') {
			await this.emailService.sendCodeEmail(
				email,
				'Код для регистрации',
				code
			)
		} else if (type === 'reset') {
			await this.emailService.sendResetEmail(
				email,
				'Восстановление пароля',
				code
			)
		}

		return { ok: true }
	}

	public async resetPassword(dto: ResetPasswordReqest) {
		const { email, password, code } = dto
		await this.verifyCode({ code })

		const user = await this.prismaService.user.findUnique({
			where: { email }
		})
		if (!user) throw new NotFoundException('Пользователь не найден!')

		const hashedPassword = await argon2.hash(password)

		await this.prismaService.user.update({
			where: { id: user.id },
			data: { password: hashedPassword }
		})

		return { ok: true }
	}

	public async verifyCode(dto: VerifyCodeRequest) {
		const { code } = dto

		const isCodeExists = await this.prismaService.code.findUnique({
			where: { code }
		})
		if (!isCodeExists) throw new NotFoundException('Код неверный!')

		if (isCodeExists.expiresAt < new Date()) {
			await this.prismaService.code.delete({ where: { code } })
			throw new NotFoundException('Код истёк! Попробуйте ещё раз')
		}
		await this.prismaService.code.delete({ where: { code } })

		return { ok: true }
	}

	public async refresh(req: Request, res: Response) {
		const refreshToken = req.cookies.refreshToken
		if (!refreshToken) return

		const userPayload = await this.jwtService.decode(refreshToken)

		const user = await this.prismaService.user.findUnique({
			where: { id: userPayload.userId }
		})
		if (!user) throw new NotFoundException('Пользователь не найден')

		return await this.auth(res, user)
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
			expiresIn: '60min'
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
			maxAge: 60480000
		})

		res.cookie('accessToken', accessToken, {
			httpOnly: false,
			maxAge: 3600000,
			sameSite: 'lax',
			path: '/'
		})

		return { ok: true }
	}

	// SOCIALS
	public async googleLogin(user: any, res: Response) {
		const isUserExists = await this.prismaService.user.findUnique({
			where: {
				email: user.email
			}
		})

		let dbUser = isUserExists

		if (!isUserExists) {
			dbUser = await this.prismaService.user.create({
				data: {
					email: user.email,
					name: user.name,
					avatar: user.avatar,
					provider: 'GOOGLE'
				}
			})
		}

		return await this.auth(res, dbUser!)
	}

	public async yandexAuth(user: any, res: Response) {
		const isUserExists = await this.prismaService.user.findUnique({
			where: {
				email: user.email
			}
		})

		let dbUser = isUserExists

		if (!isUserExists) {
			dbUser = await this.prismaService.user.create({
				data: {
					email: user.email,
					name: user.name,
					avatar: user.avatar,
					provider: 'YANDEX'
				}
			})
		}

		return await this.auth(res, dbUser!)
	}
}
