import z from 'zod'

export const registerSchema = z.object({
	name: z
		.string('Имя должно быть строкой')
		.min(3, 'Минимальная длина имени - 3 символа!')
		.max(50, 'Минимальная длина имени - 50 символов!')
		.nonempty('Имя обязательно!'),
	password: z
		.string('Пароль должен быть строкой')
		.min(8, 'Минимальная длина пароя - 8 символов!'),
	emailOrPhone: z
		.string('Почта должна быть строкой')
		.nonempty('Почта обязательна!')
})

export type RegisterSchemaType = z.infer<typeof registerSchema>
