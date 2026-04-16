import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Message } from 'generated/prisma/client'
import { Server } from 'socket.io'

@WebSocketGateway({
	cors: {
		origin: process.env.CLIENT_URL
	}
})
export class MessageGateway {
	@WebSocketServer()
	server!: Server

	@SubscribeMessage('join')
	handleJoin(@MessageBody() chatId: string, @ConnectedSocket() client: any) {
		client.join(chatId)
	}

	joinChat(client: any, chatId: string) {
		client.join(chatId)
	}

	sendMessageEvent(chatId: string, message: Message) {
		this.server.to(chatId).emit('message', message)
	}

	editMessageEvent(chatId: string, messageId: string) {
		this.server.to(chatId).emit('editMessage', messageId)
	}

	deleteMessageEvent(chatId: string, messageId: string) {

		this.server.to(chatId).emit('deleteMessage', messageId)
	}
}
