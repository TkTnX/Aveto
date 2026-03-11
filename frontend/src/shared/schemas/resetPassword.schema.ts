import z from 'zod'

export const resetPasswordSchema = z
	.object({
		password: z
			.string('Пароль должен быть строкой')
			.min(8, 'Минимальная длина пароя - 8 символов!'),
		confirmPassword: z
			.string('Пароль должен быть строкой')
			.min(8, 'Минимальная длина пароя - 8 символов!'),
		email: z.email('Почта некорректна!'),
		code: z.string('Код должен быть строкой').length(6, "Длина кода должна быть 6 символов")
	})
	.refine(
		data => data.password === data.confirmPassword,
		'Пароли не совпадают!'
	)

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>
