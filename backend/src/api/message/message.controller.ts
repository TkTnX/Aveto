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
import { IAuthPayload } from 'src/types'

import { MessageService } from './message.service'

@ApiTags('Сообщения')
@Controller('messages')
export class MessageController {
	public constructor(private readonly messageService: MessageService) {}

	@Post(':chatId')
	@UseGuards(AuthGuard)
	public async sendMessage(
		@Body() dto: SendMessageRequst,
		@User() payload: IAuthPayload,
		@Param('chatId') chatId: string
	) {
		return this.messageService.sendMessage(dto, payload.userId, chatId)
	}

	@Patch(':messageId')
	@UseGuards(AuthGuard)
	public async editMessage(
		@Param('messageId') messageId: string,
		@Body() dto: SendMessageRequst,
		@User() payload: IAuthPayload
	) {
		return this.messageService.editMessage(messageId, dto, payload.userId)
	}

	@Delete(':messageId')
	@UseGuards(AuthGuard)
	public async deleteMessage(
		@Param('messageId') messageId: string,
		@User() payload: IAuthPayload
	) {
		return this.messageService.deleteMessage(messageId, payload.userId)
	}
}
