import { useQuery } from '@tanstack/react-query'

import { getAds } from '@/src/api'
import { IAd } from '@/src/shared/types'

export function useAds() {
	const getAllQuery = (query?: Record<string, string>) =>
		useQuery({
			queryKey: ['ads'],
			queryFn: (): Promise<IAd[]> => getAds(query)
		})

	return { getAllQuery }
}
