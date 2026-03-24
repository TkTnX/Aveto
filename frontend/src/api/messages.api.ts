import { axiosInstance } from '@/src/shared'
import { FullSendMessageType } from '@/src/shared/schemas'

export async function sendMessage(values: FullSendMessageType) {
	const { chatId, ...restValues } = values
	const { data } = await axiosInstance.post(`messages/${chatId}`, restValues)

	return data
}

export async function deleteMessage(messageId: string) {
	const { data } = await axiosInstance.delete(`messages/${messageId}`)
	
	return data
}