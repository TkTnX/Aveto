import z from 'zod'

export const addAdSchema = z.object({
	title: z.string('Имя должно быть строкой'),
	description: z.string('Описание должно быть строкой'),
	price: z.string('Цена должна быть числом'),
	quantity: z.string('Количество должно быть числом').optional(),
	email: z.email('Некорректная почта'),
	phone: z
		.string('Телефон должен быть строкой')
		.nonempty('Телефон обязателен!'),
})

export type AddAdSchemaType = z.infer<typeof addAdSchema>

