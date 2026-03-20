import { IChat, IUser } from "."

export interface IMessage {
    id: string
    sender: IUser
    senderId: string
    chat: IChat
    chatId: string

    text: string

    createdAt: string
    updatedAt: string
}