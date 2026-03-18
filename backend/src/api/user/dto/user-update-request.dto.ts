import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';








export class UserUpdateRequest {
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
	name: string

	@ApiProperty({
		title: 'Аватар пользователя',
		example: 'https://example-image.jpg',
		type: String
	})
	avatar?: string
}
