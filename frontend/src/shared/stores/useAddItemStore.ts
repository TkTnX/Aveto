import { create } from 'zustand'

interface AddItemStoreProps {
    step: number
    setStep: (num: number) => void
}

export const useAddItemStore = create<AddItemStoreProps>(set => ({
    step: 0,
    setStep: (step: number) => set({step})
}))
