import { IUser } from "."

export interface IReview {
    id: string
    rating: number
    text: string
    replyTo: string

    writer?: IUser
    writerId: string
    receiver?: IUser
    receiverId: string

    createdAt: string
}