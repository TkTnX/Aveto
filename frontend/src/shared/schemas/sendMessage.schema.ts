import z from 'zod'

export const sendMessageSchema = z.object({
    text: z.string('Текст должен быть строкой!').nonempty("Текст обязателен!"),
  
})

export type SendMessageSchemaType = z.infer<typeof sendMessageSchema>

