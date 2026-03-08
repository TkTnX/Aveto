import { IAd, IUser } from '.'

export interface IFavorite {
	id: string
	ad: IAd
	adId: string

	user: IUser
	userId: string
}
