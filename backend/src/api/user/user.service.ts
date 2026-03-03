import { Injectable, NotFoundException } from '@nestjs/common'
import { Request } from 'express'
import { UserUpdateRequest } from 'src/api/user/dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { IAuthPayload } from 'src/types'

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}

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

	public async update(body: UserUpdateRequest, file: Express.Multer.File) {
		console.log({body, file})
		return body
	}
}
