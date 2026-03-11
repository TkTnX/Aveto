import { IsString, MinLength } from "class-validator";

export class ResetPasswordReqest {
        @IsString({ message: 'Пароль должен быть строкой!' })
        @MinLength(8, { message: 'Минимальная длина пароля - 8 символов!' })
    password: string
    
    email: string
    code: string
}