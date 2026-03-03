import { IsNotEmpty, IsString, Length } from "class-validator";

export class UserUpdateRequest {
	@IsNotEmpty({ message: 'Имя пользователя обязательно!' })
	@IsString({ message: 'Имя пользователя должно быть строкой!' })
	@Length(3, 50, {
		message: 'Имя пользователя должно быть от 3 до 50 символов!'
	})
	name: string

	avatar?:string
}
