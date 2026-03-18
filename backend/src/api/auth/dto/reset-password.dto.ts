import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";















export class ResetPasswordReqest {
	@ApiProperty({
		title: 'Пароль',
		example: '*********',
		type: String
	})
	@IsString({ message: 'Пароль должен быть строкой!' })
	@MinLength(8, { message: 'Минимальная длина пароля - 8 символов!' })
	password: string

	@ApiProperty({
		title: 'Почта пользователя',
		example: 'test@example.com',
		type: String
	})
    email: string
    
	@ApiProperty({
		title: 'Код',
		example: '000000',
		type: String
	})
	code: string
}