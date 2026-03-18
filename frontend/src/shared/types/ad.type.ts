import { ICategory, ICharacteristic, IUser } from '.';







export interface IAd {
	id: string
	title: string
	slug: string
	price: number
	quantity: number
	images: string[]
	discount?: number
	description: string
	address: string
	views: number
	isFinished: boolean
	phone: string
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
