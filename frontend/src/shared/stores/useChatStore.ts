import { IMessage } from '@/src/shared/types'
import { create } from 'zustand'

interface ChatStoreProps {
	chatId: string | null
	replyTo: IMessage | null
	editMessage: IMessage | null
	setChatId: (id: string) => void
	setReplyTo: (message: IMessage | null) => void
	setEditMessage: (message: IMessage | null) => void
}

export const useChatStore = create<ChatStoreProps>(set => ({
	chatId: null,
	replyTo: null,
	editMessage: null,
	setChatId: chatId => set({ chatId }),
	setReplyTo: replyTo => set({ replyTo }),
	setEditMessage: (editMessage) => set({editMessage})
}))
