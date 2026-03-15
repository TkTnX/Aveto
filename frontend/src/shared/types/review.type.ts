import { IAd, IUser } from '.'

export interface IReview {
	id: string
	rating: number
	text: string
	replyTo: string
	isBought: string
	howFinished: string

	writer?: IUser
	writerId: string
	receiver?: IUser
	receiverId: string
	ad?: IAd
	adId: string

	createdAt: string
}

export interface IWriteReview {
	isBought: string
	howFinished: string
	adId: string
	text: string
	rating: number
	receiverId: string
}
