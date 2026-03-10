import { useQuery } from '@tanstack/react-query'

import { getBySlugWithChildren, getCategories } from '@/src/api'
import { ICategory } from '@/src/shared/types'

export function useCategories() {
	const getAllQuery = () =>
		useQuery({
			queryKey: ['categories'],
			queryFn: (): Promise<ICategory[]> => getCategories()
		})

	const getBySlugWithChildrenQuery = (slug: string) =>
		useQuery({
			queryKey: ['category', slug],
			queryFn: (): Promise<ICategory> => getBySlugWithChildren(slug)
		})

	return { getAllQuery, getBySlugWithChildrenQuery }
}
