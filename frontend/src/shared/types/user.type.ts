import { IAd, IFavorite, IReview, ISubscription } from '.'

export interface IUser {
	id: string
	ads: IAd[]

	name: string
	avatar?: string
	phone?: string
	email?: string
	isPhoneVerified: boolean
	isEmailVerified: boolean

	subscriptions: ISubscription[]
	subscribers: ISubscription[]
	favorites: IFavorite[]


	writterReviews: IReview[]
	receiverReviews: IReview[]

	createdAt: string
}
