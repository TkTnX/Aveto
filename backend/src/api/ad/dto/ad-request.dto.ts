import {
	IsEmail,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsString
} from 'class-validator'
import { EAdCondition } from 'generated/prisma/enums'

// TODO: Добавить документацию swagger
export class AdRequest {
	@IsNotEmpty({ message: 'Название обязательно!' })
	@IsString({ message: 'Название должно быть строкой!' })
	title: string

	@IsNotEmpty({ message: 'Цена обязательна!' })
	price: string

	quantity: string

	@IsOptional()
	@IsInt({ message: 'Скидка должна быть числом!' })
	discount?: number

	@IsNotEmpty({ message: 'Адрес обязателен!' })
	@IsString({ message: 'Адрес должен быть строкой!' })
	address: string

	@IsNotEmpty({ message: 'Описание обязательно!' })
	@IsString({ message: 'Описание должно быть строкой!' })
	description: string

	images: string[]

	@IsNotEmpty({ message: 'Состояние обязательно' })
	@IsEnum(EAdCondition, {
		message: 'Состояние должно быть одним из предложенных!'
	})
	condition: EAdCondition

	@IsNotEmpty({ message: 'Категория обязательна!' })
	@IsString({ message: 'Категория должна быть строкой!' })
	categoryId: string

	@IsNotEmpty({ message: 'Почта обязательна!' })
	@IsEmail({}, { message: 'Неверный формат почты!' })
	email: string

	@IsNotEmpty({ message: 'Телефон обязателен!' })
	@IsPhoneNumber('RU', { message: 'Неверный формат телефона!' })
	phone: string
}
