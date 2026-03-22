import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from 'src/api/auth/decorators/user.decorator'
import { AuthGuard } from 'src/api/auth/guards/auth.guard'
import { ChatRequest } from 'src/api/chat/dto'
import { IAuthPayload } from 'src/types'

import { ChatService } from './chat.service'

@ApiTags('Чаты')
@Controller('chats')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Get()
	@ApiResponse({ description: 'Получение чатов пользователя' })
	@UseGuards(AuthGuard)
	public async getUserChats(@User() payload: IAuthPayload) {
		return await this.chatService.getUserChats(payload.userId)
	}

	@Get(':chatId')
	@ApiResponse({ description: 'Получение чата' })
	@UseGuards(AuthGuard)
	public async getChat(@Param('chatId') chatId: string) {
		return await this.chatService.getChat(chatId)
	}

	@Post()
	@ApiResponse({ description: 'Создание чата' })
	@UseGuards(AuthGuard)
	public async createChat(@Body() dto: ChatRequest) {
		return await this.chatService.createChat(dto)
	}

	@Delete(':chatId')
	@ApiResponse({ description: 'Удаление чата' })
	@UseGuards(AuthGuard)
	public async deleteChat(@Param('chatId') chatId: string) {
		return await this.chatService.deleteChat(chatId)
	}
}
