import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CategoryRequest {
	@ApiProperty({
		title: 'Название категории',
		example: 'Телефоны',
		type: String
	})
	@IsNotEmpty({ message: 'Название обязательно!' })
	@IsString({ message: 'Название должно быть строкой!' })
	name: string

	@ApiProperty({
		title: 'Изображение',
		example: 'https://example-image.jpg',
		type: String
	})
	image?: string

	@ApiProperty({
		title: 'ID Родителя',
		example: 'b2247318-6b7e-4b7c-87dc-cf6635ca898b',
		type: String
	})
	parentId?: string
}
