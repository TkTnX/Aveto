import { create } from 'zustand'

interface AddItemStoreProps {
	category: null | string
	setCategory: (categoryId: string) => void
}

export const useAddItemStore = create<AddItemStoreProps>(set => ({
	category: null,
	setCategory: category => set({ category })
}))
