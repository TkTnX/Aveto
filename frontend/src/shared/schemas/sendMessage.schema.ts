import z from 'zod'

export const sendMessageSchema = z.object({
    text: z.string('Текст должен быть строкой!').nonempty("Текст обязателен!"),
    
})

export type SendMessageSchemaType = z.infer<typeof sendMessageSchema> 
export type FullSendMessageType = SendMessageSchemaType & {chatId: string, replyTo?: string, messageId?:string}