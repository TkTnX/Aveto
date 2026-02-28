import z from 'zod'

export const loginSchema = z.object({
	emailOrPhone: z
		.string('Телефон или почта должны быть строкой')
		.nonempty('Почта или телефон обязательны!'),
	password: z
		.string('Пароль должен быть строкой')
		.min(8, 'Минимальная длина пароя - 8 символов!')
})

export type LoginSchemaType = z.infer<typeof loginSchema>
