import { ApiProperty } from '@nestjs/swagger'
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	MinLength
} from 'class-validator'

export class RegisterRequest {
	@ApiProperty({
		title: 'Имя пользователя',
		example: 'Иван Иванов',
		type: String
	})
	@IsNotEmpty({ message: 'Имя пользователя обязательно!' })
	@IsString({ message: 'Имя пользователя должно быть строкой!' })
	@Length(3, 50, {
		message: 'Имя пользователя должно быть от 3 до 50 символов!'
	})
	name!: string

	@ApiProperty({
		title: 'Почта или телефон пользователя',
		example: 'test@example.com | +7(___)___-__-__',
		type: String
	})
	@IsString({ message: 'Почта или телефон должны быть строкой!' })
	@IsNotEmpty({ message: 'Почта или телефон обязательны!' })
	emailOrPhone!: string

	@ApiProperty({
		title: 'Пароль',
		example: '*********',
		type: String
	})
	@IsOptional()
	@IsString({ message: 'Пароль должен быть строкой!' })
	@MinLength(8, { message: 'Минимальная длина пароля - 8 символов!' })
	password!: string
}
