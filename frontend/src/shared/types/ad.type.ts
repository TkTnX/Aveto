import { ICategory, ICharacteristic, IUser } from '.'

export interface IAd {
	id: string
	title: string
	slug: string
	price: number
	images: string[]
	discount?: number
	address: string
	views: number
	isFinished: boolean 
	condition: EAdCondition

	category?: ICategory
	categoryId: string
	characteristics: ICharacteristic[]
	seller?: IUser
	sellerId: string

	createdAt: string
	updatedAt?: string
}

export enum EAdCondition {
	NEW,
	USED
}
