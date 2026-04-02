import { useMutation } from '@tanstack/react-query'

import { deleteMessage, editMessage, sendMessage } from '@/src/api'
import { FullSendMessageType } from '@/src/shared/schemas'

export function useMessages() {
	const sendMessageMutation = () =>
		useMutation({
			mutationKey: ['send message'],
			mutationFn: (values: FullSendMessageType) => sendMessage(values)
		})

	const editMessageMutation = () =>
		useMutation({
			mutationKey: ['edit message'],
			mutationFn: (values: FullSendMessageType ) =>
				editMessage(values)
		})

	const deleteMessageMutation = (messageId: string) =>
		useMutation({
			mutationKey: ['delete message', messageId],
			mutationFn: (chatId: string) => deleteMessage(chatId, messageId)
		})

	return {
		sendMessageMutation,
		editMessageMutation,
		deleteMessageMutation
	}
}
