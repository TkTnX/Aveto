import { useMutation, useQuery } from '@tanstack/react-query'

import { createChat, deleteChat, getUserChats } from '@/src/api'
import { IChat, IChatRequest } from '@/src/shared/types'

export function useChats() {
	const getUserChatsQuery = () =>
		useQuery({
			queryKey: ['get user chat'],
			queryFn: (): Promise<IChat[]> => getUserChats()
		})

	const createChatMutation = (values: IChatRequest) =>
		useMutation({
			mutationKey: ['create chat'],
			mutationFn: () => createChat(values)
		})

	const deleteChatMutation = (chatId: string) =>
		useMutation({
			mutationKey: ['delete chat'],
			mutationFn: () => deleteChat(chatId)
		})

	return {
		getUserChatsQuery,
		createChatMutation,
		deleteChatMutation
	}
}
