import { axiosInstance } from '@/src/shared'
import { FullSendMessageType } from '@/src/shared/schemas'

export async function sendMessage(values: FullSendMessageType) {
	const { chatId, messageId, ...restValues } = values
	const { data } = await axiosInstance.post(`messages/${chatId}`, restValues)

	return data
}

export async function editMessage(values: FullSendMessageType) {
	const { chatId, messageId, ...restValues } = values
	const { data } = await axiosInstance.patch(
		`messages/${chatId}/${messageId}`,
		restValues
	)

	return data
}

export async function deleteMessage(chatId: string, messageId: string) {
	const { data } = await axiosInstance.delete(
		`messages/${chatId}/${messageId}`
	)

	return data
}
