import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { UploadService } from 'src/api/upload/upload.service'
import { UserUpdateRequest } from 'src/api/user/dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { IAuthPayload } from 'src/types'

@Injectable()
export class UserService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly uploadService: UploadService,
		private readonly configService: ConfigService
	) {}

	public async getMe(userPayload: IAuthPayload) {
		const user = await this.prismaService.user.findUnique({
			where: { id: userPayload.userId },
			include: {
				ads: true
			}
		})
		if (!user) throw new NotFoundException('Пользователь не найден!')

		return user
	}

	public async update(
		body: UserUpdateRequest,
		file: Express.Multer.File,
		payload: IAuthPayload
	) {
		const { userId } = payload
		if (file) {
			const imageUrl = await this.uploadService.upload(file)
			body.avatar = `${this.configService.getOrThrow('SERVER_URL')}${imageUrl}`
		}

		return this.prismaService.user.update({
			where: {
				id: userId
			},
			data: body
		})
	}
}
