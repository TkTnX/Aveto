import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IAuthPayload } from 'src/types'

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getMe(userPayload: IAuthPayload) {
		const user = await this.prismaService.user.findUnique({
			where: { id: userPayload.userId }
		})
		if (!user) throw new NotFoundException('Пользователь не найден!')

		return user
	}
}
