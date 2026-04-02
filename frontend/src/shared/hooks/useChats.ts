import { useMutation, useQuery } from '@tanstack/react-query'

import { createChat, deleteChat, getChat, getUserChats } from '@/src/api'
import { IChat, IChatRequest } from '@/src/shared/types'

export function useChats() {
	const getUserChatsQuery = () =>
		useQuery({
			queryKey: ['get user chats'],
			queryFn: (): Promise<IChat[]> => getUserChats()
		})

	const getChatQuery = (chatId: string) =>
		useQuery({
			queryKey: ['get chat', chatId],
			queryFn: (): Promise<IChat> => getChat(chatId)
		})

	const createChatMutation = () =>
		useMutation({
			mutationKey: ['create chat'],
			mutationFn: (values: IChatRequest) => createChat(values)
		})

	const deleteChatMutation = (chatId: string) =>
		useMutation({
			mutationKey: ['delete chat', chatId],
			mutationFn: (chatId: string) => deleteChat(chatId)
		})

	return {
		getUserChatsQuery,
		createChatMutation,
		deleteChatMutation,
		getChatQuery
	}
}
