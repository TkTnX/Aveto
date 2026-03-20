import { axiosInstance } from '@/src/shared'
import { IChatRequest } from '@/src/shared/types'

export async function getUserChats() {
	const { data } = await axiosInstance.get('chats')

	return data
}

export async function createChat(values: IChatRequest) {
	const { data } = await axiosInstance.post('chats', values)

	return data
}

export async function deleteChat(chatId: string) {
	const { data } = await axiosInstance.delete(`chats/${chatId}`)

	return data
}
