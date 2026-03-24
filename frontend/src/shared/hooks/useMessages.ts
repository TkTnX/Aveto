import { useMutation } from '@tanstack/react-query'

import { deleteMessage, sendMessage } from '@/src/api'
import { FullSendMessageType } from '@/src/shared/schemas'

export function useMessages() {
	const sendMessageMutation = () =>
		useMutation({
			mutationKey: ['send message'],
			mutationFn: (values: FullSendMessageType) => sendMessage(values)
		})
	
	const deleteMessageMutation = () => useMutation({
		mutationKey: ['delete message'],
		mutationFn: (messageId: string) => deleteMessage(messageId)
	})

	return {
		sendMessageMutation,
		deleteMessageMutation
	}
}
