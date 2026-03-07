import { create } from 'zustand'

import { DraftType } from '@/src/widgets'

interface AddItemStoreProps {
	category: null | string
	setCategory: (categoryId: string) => void
	draft: null | DraftType
	setDraft: (draft: DraftType) => void
	characteristics: { name: string; value: string }[]
	setCharacteristics: (char: { name: string; value: string }) => void
}

export const useAddItemStore = create<AddItemStoreProps>((set, get) => ({
	category: null,
	setCategory: category => set({ category }),
	draft: null,
	setDraft: draft => {
		set({ draft })
	},
	characteristics: [],
	setCharacteristics: char =>
		set({ characteristics: [...get().characteristics, char] })
}))
