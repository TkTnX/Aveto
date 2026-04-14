import { IChat, IUser } from '.'

export interface IMessage {
	id: string
	user: IUser
	userId: string
	chat: IChat
	chatId: string

	replyTo?: IMessage
	replyToId?: string

	text: string

	type: EMessageType

	createdAt: string
	updatedAt: string
}

export enum EMessageType {
	TEXT = 'TEXT',
	VOICE = 'VOICE',
	IMAGE = 'IMAGE'
}
