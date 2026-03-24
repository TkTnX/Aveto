import { IChat, IUser } from "."

export interface IMessage {
    id: string
    user: IUser
    userId: string
    chat: IChat
    chatId: string

    replyTo?: IMessage
    replyToId?: string

    text: string

    createdAt: string
    updatedAt: string
}