import { create } from 'zustand'

import { DraftType } from '@/src/widgets'

interface AddItemStoreProps {
	category: null | string
	setCategory: (categoryId: string) => void
	draft: null | DraftType
	setDraft: (draft: DraftType) => void
}

export const useAddItemStore = create<AddItemStoreProps>(set => ({
	category: null,
	setCategory: category => set({ category }),
	draft: null,
	setDraft: draft => {
		set({ draft })
	}
}))
