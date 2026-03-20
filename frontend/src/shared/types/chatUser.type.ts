import { IChat, IUser } from "."

export interface IChatUser {
    id: string

    chat: IChat
    chatId: string

    user: IUser
    userId: string

}