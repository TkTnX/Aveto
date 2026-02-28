import { IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator'

export class RegisterRequest {
	@IsNotEmpty({ message: 'Имя пользователя обязательно!' })
	@IsString({ message: 'Имя пользователя должно быть строкой!' })
	@Length(3, 50, {
		message: 'Имя пользователя должно быть от 3 до 50 символов!'
	})
	name: string

	@IsString({ message: 'Почта или телефон должны быть строкой!' })
	@IsNotEmpty({ message: 'Почта или телефон обязательны!' })
	emailOrPhone: string

    @IsOptional()
	@IsString({ message: 'Пароль должен быть строкой!' })
	@MinLength(8, { message: 'Минимальная длина пароля - 8 символов!' })
	password: string
}
