import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator'

export class ReviewRequest {
	@IsNotEmpty({ message: 'Рейтинг обязателен' })
	@IsInt({ message: 'Рейтинг должен быть числом' })
	@Min(1, { message: 'Минимальный рейтинг - 1' })
	@Max(5, { message: 'Максимальный рейтинг - 5' })
	rating: number

	@IsNotEmpty({ message: 'Сообщение обязательно' })
	@IsString({ message: 'Текст должен быть строкой' })
	text: string

	@IsNotEmpty({ message: 'Получатель обязателен' })
	@IsString({ message: 'ID получателя должен быть строкой' })
	receiverId: string

	@IsNotEmpty({ message: 'Объявление обязателено' })
	@IsString({ message: 'ID объявления должен быть строкой' })
	adId: string

	@IsNotEmpty({ message: 'Нужно указать, куплен ли товар' })
	@IsString()
	isBought: string

	@IsNotEmpty({ message: 'Итог обращения обязателен' })
	@IsString({ message: 'Итог обращения должен быть строкой' })
	howFinished: string
}
