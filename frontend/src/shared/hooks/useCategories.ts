import { useQuery } from '@tanstack/react-query'

import { getCategories } from '@/src/api'
import { ICategory } from '@/src/shared/types'

export function useCategories() {
	const getAllQuery = () =>
		useQuery({
			queryKey: ['categories'],
			queryFn: (): Promise<ICategory[]> => getCategories()
		})

	return { getAllQuery }
}
