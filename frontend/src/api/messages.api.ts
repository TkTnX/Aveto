import { axiosInstance } from '@/src/shared'
import { FullSendMessageType } from '@/src/shared/schemas'

import { uploadFiles } from './upload-record.api'

export async function sendMessage(values: FullSendMessageType) {
	const { chatId, messageId, messageMedia, ...restValues } = values

	const formData = new FormData()

	for (let i = 0; i < messageMedia.length; i++) {
		formData.append('files', messageMedia[i])
	}
	const media = await uploadFiles(formData)
	console.log(media)

	const { data } = await axiosInstance.post(`messages/${chatId}`, {media, ...restValues})

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
