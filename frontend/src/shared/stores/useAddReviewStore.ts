import { create } from 'zustand'

import { IAd } from '@/src/shared/types'

interface AddReviewStoreProps {
	ad: null | IAd
	isBought: null | string
	howFinished: null | string
	rating: null | number
	text: null | string
	setAd: (ad: IAd | null) => void
	setIsBought: (bool: string) => void
	setHowFinished: (str: string) => void
	setRating: (rating: number) => void
	setText: (text: string) => void

	errors: string[]
	setErrors: (errors: string[]) => void
}

export const useAddReviewStore = create<AddReviewStoreProps>(set => ({
	ad: null,
	isBought: null,
	howFinished: null,
	rating: null,
	text: null,
    errors: [],
    
	setAd: ad => set({ ad }),
	setIsBought: isBought => set({ isBought }),
	setHowFinished: howFinished => set({ howFinished }),
	setRating: rating => set({ rating }),
	setText: text => set({ text }),
	setErrors: errors => set({ errors })
}))
