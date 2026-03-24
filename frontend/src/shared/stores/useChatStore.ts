import { IMessage } from '@/src/shared/types'
import { create } from 'zustand'

interface ChatStoreProps {
	chatId: string | null
	replyTo: IMessage | null
	setChatId: (id: string) => void
	setReplyTo: (message: IMessage | null) => void
}

export const useChatStore = create<ChatStoreProps>(set => ({
	chatId: null,
	replyTo: null,
	setChatId: chatId => set({ chatId }),
	setReplyTo: replyTo => set({ replyTo })
}))
