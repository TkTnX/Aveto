import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { EAdCondition } from 'generated/prisma/enums'

export class AdRequest {
	@IsNotEmpty({ message: 'Название обязательно!' })
	@IsString({ message: 'Название должно быть строкой!' })
	title: string

	@IsNotEmpty({ message: 'Цена обязательна!' })
	@IsInt({ message: 'Цена должна быть ценой' })
	price: number

    @IsOptional()
	@IsInt({ message: 'Скидка должна быть числом!' })
	discount?: number

	@IsNotEmpty({ message: 'Адрес обязателен!' })
	@IsString({ message: 'Адрес должен быть строкой!' })
	address: string

	@IsNotEmpty({ message: 'Описание обязательно!' })
	@IsString({ message: 'Описание должно быть строкой!' })
	description: string

	images: File[]

	@IsNotEmpty({ message: 'Состояние обязательно' })
	@IsEnum(EAdCondition, {
		message: 'Состояние должно быть одним из предложенных!'
	})
	condition: EAdCondition

	@IsNotEmpty({ message: 'Категория обязательна!' })
	@IsString({ message: 'Категория должна быть строкой!' })
	categoryId: string
}
