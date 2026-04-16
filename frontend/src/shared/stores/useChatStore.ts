import { IMessage } from '@/src/shared/types'
import { create } from 'zustand'

interface ChatStoreProps {
	chatId: string | null
	replyTo: IMessage | null
	editMessage: IMessage | null
	messageMedia: File[]
	setChatId: (id: string) => void
	setReplyTo: (message: IMessage | null) => void
	setEditMessage: (message: IMessage | null) => void
	setMessageMedia: (files: FileList) => void
}

export const useChatStore = create<ChatStoreProps>((set, get) => ({
	chatId: null,
	replyTo: null,
	editMessage: null,
	messageMedia: [],
	setChatId: chatId => set({ chatId }),
	setReplyTo: replyTo => set({ replyTo }),
	setEditMessage: (editMessage) => set({ editMessage }),
	setMessageMedia: (files) => set({messageMedia: [...get().messageMedia, ...files]})
}))
