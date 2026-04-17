import { EMessageType } from '@/src/shared/types'
import z from 'zod'

export const sendMessageSchema = z.object({
    text: z.string('Текст должен быть строкой!'),
    
})

export type SendMessageSchemaType = z.infer<typeof sendMessageSchema> 
export type FullSendMessageType = SendMessageSchemaType & { chatId: string, replyTo?: string, messageId?: string, type?:EMessageType, messageMedia: File[]}
