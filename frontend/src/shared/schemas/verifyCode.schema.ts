import z from 'zod'

export const verifyCodeSchema = z.object({
	code: z
		.string('Код должен быть строкой!')
		.length(6, 'Код должен состоять из 6 символов')
})

export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>
