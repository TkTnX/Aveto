import {
	Body,
	Controller,
	Delete,
	Param,
	Patch,
	Post,
	UseGuards
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from 'src/api/auth/decorators/user.decorator'
import { AuthGuard } from 'src/api/auth/guards/auth.guard'
import { SendMessageRequst } from 'src/api/message/dto'
import { MessageGateway } from 'src/api/message/message.gateway'
import { IAuthPayload } from 'src/types'

import { MessageService } from './message.service'

@ApiTags('Сообщения')
@Controller('messages')
export class MessageController {
	public constructor(
		private readonly messageService: MessageService,
		private readonly gateway: MessageGateway
	) {}

	@Post(':chatId')
	@UseGuards(AuthGuard)
	public async sendMessage(
		@Body() dto: SendMessageRequst,
		@User() payload: IAuthPayload,
		@Param('chatId') chatId: string
	) {
		const message = await this.messageService.sendMessage(
			dto,
			payload.userId,
			chatId
		)

		this.gateway.sendMessageEvent(chatId, message)

		return message
	}

	@Delete('/:chatId/:messageId')
	@UseGuards(AuthGuard)
	public async deleteMessage(
		@Param() params: Record<string, string>,

		@User() payload: IAuthPayload
	) {
		const { chatId, messageId } = params

		const deletedMessage = await this.messageService.deleteMessage(
			messageId,
			payload.userId
		)

		this.gateway.deleteMessageEvent(chatId, deletedMessage.id)

		return deletedMessage
	}

	@Patch('/:chatId/:messageId')
	@UseGuards(AuthGuard)
	public async editMessage(
		@Param() params: Record<string, string>,
		@Body() dto: SendMessageRequst,
		@User() payload: IAuthPayload
	) {
		const { chatId, messageId } = params
		const editedMessage = await this.messageService.editMessage(
			messageId,
			dto,
			payload.userId
		)

		this.gateway.editMessageEvent(chatId, editedMessage.id)

		return editedMessage
	}
}
