import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';








export class LoginRequest {
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
	@IsString({ message: 'Пароль должен быть строкой!' })
	@MinLength(8, { message: 'Минимальная длина пароля - 8 символов!' })
	password!: string
}
