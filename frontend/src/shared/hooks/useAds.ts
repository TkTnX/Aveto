import { useMutation, useQuery } from '@tanstack/react-query'

import { createAd, getAds } from '@/src/api'
import { IAd } from '@/src/shared/types'

export function useAds() {
	const getAllQuery = (query?: Record<string, string>) =>
		useQuery({
			queryKey: ['ads'],
			queryFn: (): Promise<IAd[]> => getAds(query)
		})

	const createMutation = () => useMutation({
		mutationKey: ['create ad'],
		mutationFn: (formData: FormData):Promise<IAd> => createAd(formData) 
		})

	return { getAllQuery, createMutation }
}

