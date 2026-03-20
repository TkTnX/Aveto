import { ApiProperty } from '@nestjs/swagger'
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

export class AdRequest {
	@ApiProperty({
		title: 'Заголовок',
		example: 'iPhone 11 256GB',
		type: String
	})
	@IsNotEmpty({ message: 'Название обязательно!' })
	@IsString({ message: 'Название должно быть строкой!' })
	title: string

	@ApiProperty({
		title: 'Цена',
		example: 100000,
		type: Number
	})
	@IsNotEmpty({ message: 'Цена обязательна!' })
	price: string

	@ApiProperty({
		title: 'Количество товара',
		example: 10,
		type: Number
	})
	quantity: string

	@ApiProperty({
		title: 'Скидка',
		example: 10,
		type: Number
	})
	@IsOptional()
	@IsInt({ message: 'Скидка должна быть числом!' })
	discount?: number

	@ApiProperty({
		title: 'Адрес',
		example: 'Улица Пушкина, дом Калатушкина',
		type: String
	})
	@IsNotEmpty({ message: 'Адрес обязателен!' })
	@IsString({ message: 'Адрес должен быть строкой!' })
	address: string

	@ApiProperty({
		title: 'Описание',
		example: 'Крутой телефон, для крутых чуваков',
		type: String
	})
	@IsNotEmpty({ message: 'Описание обязательно!' })
	@IsString({ message: 'Описание должно быть строкой!' })
	description: string

	@ApiProperty({
		title: 'Изображения',
		example: ['https://example-image1.jpg', 'https://example-image2.jpg'],
		type: [String]
	})
	images: string[]

	@ApiProperty({
		title: 'Состояние',
		example: 'NEW',
		type: String,
		enum: EAdCondition
	})
	@IsNotEmpty({ message: 'Состояние обязательно' })
	@IsEnum(EAdCondition, {
		message: 'Состояние должно быть одним из предложенных!'
	})
	condition: EAdCondition

	@ApiProperty({
		title: 'ID Категории',
		example: 'b2247318-6b7e-4b7c-87dc-cf6635ca898b',
		type: String
	})
	@IsNotEmpty({ message: 'Категория обязательна!' })
	@IsString({ message: 'Категория должна быть строкой!' })
	categoryId: string

	@ApiProperty({
		title: 'Почта',
		example: 'test@example.com',
		type: String
	})
	@IsNotEmpty({ message: 'Почта обязательна!' })
	@IsEmail({}, { message: 'Неверный формат почты!' })
	email: string

	@ApiProperty({
		title: 'Телефон',
		example: '+7(___)___-__-__',
		type: String
	})
	@IsNotEmpty({ message: 'Телефон обязателен!' })
	@IsPhoneNumber('RU', { message: 'Неверный формат телефона!' })
	phone: string

	@ApiProperty({
		title: 'ID Характеристик',
		example:
			'["b2247318-6b7e-4b7c-87dc-cf6635ca898b", "b2247318-6b7e-4b7c-87dc-cf6635ca898b", "b2247318-6b7e-4b7c-87dc-cf6635ca898b"]',
		type: String
	})
	characteristics?: string
}
