import {  IMessage, IAd, IChatUser } from "."

export interface IChat {
    id: string
    participants: IChatUser[]

    ad: IAd
    adId: string

    messages: IMessage[]

    createdAt: string
}

export interface IChatRequest {
    adId: string
    user1Id: string
    user2Id: string
}