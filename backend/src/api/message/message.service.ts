import {
	BadGatewayException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { EMessageType } from 'generated/prisma/enums'
import { ChatService } from 'src/api/chat/chat.service'
import { SendMessageRequst } from 'src/api/message/dto'
import { UserService } from 'src/api/user/user.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class MessageService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly chatService: ChatService
	) {}

	public async sendMessage(
		dto: SendMessageRequst,
		userId: string,
		chatId: string
	) {
		const user = await this.userService.getBrand(userId)
		const chat = await this.chatService.getChat(chatId)

		if (!chat.participants.find(par => par.userId === user.id))
			throw new UnauthorizedException('У вас нет доступа к этому чату!')
		const message = await this.prismaService.message.create({
			data: {
				text: dto.text,
				chatId: chat.id,
				userId: user.id,
				replyToId: dto.replyTo,
				type: dto.type
			}
		})
		console.log(message)
		if (!message) throw new BadGatewayException('Сообщение не был создано!')

		return message
	}

	public async editMessage(
		messageId: string,
		dto: SendMessageRequst,
		userId: string
	) {
		const message = await this.getMessage(messageId)

		if (message.userId !== userId)
			throw new UnauthorizedException('Это не ваше сообщение!')

		return await this.prismaService.message.update({
			where: {
				id: message.id
			},
			data: {
				text: dto.text,
				replyToId: dto.replyTo,
				updatedAt: new Date()
			}
		})
	}

	public async deleteMessage(messageId: string, userId: string) {
		const message = await this.getMessage(messageId)

		if (message.userId !== userId)
			throw new UnauthorizedException('Это не ваше сообщение!')

		return await this.prismaService.message.delete({
			where: { id: message.id }
		})
	}

	private async getMessage(id: string) {
		const message = await this.prismaService.message.findUnique({
			where: { id }
		})

		if (!message) throw new NotFoundException('Сообщение не найдено!')

		return message
	}
}
