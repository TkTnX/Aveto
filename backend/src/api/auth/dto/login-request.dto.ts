import { IsNotEmpty,  IsString,  MinLength } from 'class-validator'

export class LoginRequest {

    @IsString({ message: 'Почта или телефон должны быть строкой!' })
    @IsNotEmpty({ message: 'Почта или телефон обязательны!' })
    emailOrPhone: string

    @IsString({ message: 'Пароль должен быть строкой!' })
    @MinLength(8, { message: 'Минимальная длина пароля - 8 символов!' })
    password: string
}
