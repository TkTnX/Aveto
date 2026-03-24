import {
	BadGatewayException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { ChatRequest } from 'src/api/chat/dto'
import { UserService } from 'src/api/user/user.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ChatService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService
	) {}

	public async getUserChats(userId: string) {
		const user = await this.userService.getBrand(userId)

		const chats = await this.prismaService.chat.findMany({
			where: {
				participants: {
					some: {
						userId: user.id
					}
				}
			},
			include: {
				participants: {
					include: {
						user: true
					}
				},
				messages: true,
				ad: { include: { seller: true } }
			}
		})

		if (!chats) throw new NotFoundException('Чаты не найдены!')

		return chats
	}

	public async getChat(id: string) {
		const chat = await this.prismaService.chat.findUnique({
			where: { id },
			include: {
				messages: {
					include: {
						user: true,
						replyTo: { include: { user: true } }
					},
					orderBy: {
						createdAt: 'asc'
					}
				},
				ad: true,
				participants: true
			}
		})
		if (!chat) throw new NotFoundException('Чат не найден!')

		return chat
	}

	public async createChat(dto: ChatRequest) {
		const { adId, user1Id, user2Id } = dto
		const user1 = await this.userService.getBrand(user1Id)
		const user2 = await this.userService.getBrand(user2Id)
		const ad = await this.prismaService.ad.findUnique({
			where: { id: adId }
		})

		if (!ad) throw new NotFoundException('Объявление не найдено')

		const chat = await this.prismaService.chat.create({
			data: {
				adId,
				participants: {
					create: [
						{
							user: {
								connect: { id: user1.id }
							}
						},
						{
							user: {
								connect: { id: user2.id }
							}
						}
					]
				}
			},
			include: {
				participants: {
					include: {
						user: true
					}
				}
			}
		})
		if (!chat) throw new BadGatewayException('Не удалось создать чат')

		return chat
	}

	public async deleteChat(chatId: string) {
		const chat = await this.prismaService.chat.findUnique({
			where: { id: chatId }
		})
		if (!chat) throw new NotFoundException('Чат не найден!')

		return await this.prismaService.chat.delete({ where: { id: chat.id } })
	}
}
