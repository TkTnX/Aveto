import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';




































export class ReviewRequest {
	@ApiProperty({
		title: 'Рейтинг',
		example: 5,
		type: Number
	})
	@IsNotEmpty({ message: 'Рейтинг обязателен' })
	@IsInt({ message: 'Рейтинг должен быть числом' })
	@Min(1, { message: 'Минимальный рейтинг - 1' })
	@Max(5, { message: 'Максимальный рейтинг - 5' })
	rating: number

	@ApiProperty({
		title: 'Текст отзыва',
		example: 'Мне всё понравилось!!!',
		type: String
	})
	@IsNotEmpty({ message: 'Сообщение обязательно' })
	@IsString({ message: 'Текст должен быть строкой' })
	text: string

	@ApiProperty({
		title: 'ID Получателя',
		example: 'b2247318-6b7e-4b7c-87dc-cf6635ca898b',
		type: String
	})
	@IsNotEmpty({ message: 'Получатель обязателен' })
	@IsString({ message: 'ID получателя должен быть строкой' })
	receiverId: string

	@ApiProperty({
		title: 'ID Объявления',
		example: 'b2247318-6b7e-4b7c-87dc-cf6635ca898b',
		type: String
	})
	@IsNotEmpty({ message: 'Объявление обязателено' })
	@IsString({ message: 'ID объявления должен быть строкой' })
	adId: string

	@ApiProperty({
		title: 'Куплено/Не куплено',
		example: 'Да | Нет',
		type: String
	})
	@IsNotEmpty({ message: 'Нужно указать, куплен ли товар' })
	@IsString()
	isBought: string

	@ApiProperty({
		title: 'Как прошло общение?',
		example: 'Товар отправлен',
		type: String
	})
	@IsNotEmpty({ message: 'Итог обращения обязателен' })
	@IsString({ message: 'Итог обращения должен быть строкой' })
	howFinished: string
}
