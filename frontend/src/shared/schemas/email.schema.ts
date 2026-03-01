import z from 'zod'

export const emailSchema = z.object({
	email: z.email('Некорректная почта')
})

export type EmailSchemaType = z.infer<typeof emailSchema>
