import { useQuery } from '@tanstack/react-query'

import { getBySlugWithChildren, getCategories } from '@/src/api'
import { ICategory } from '@/src/shared/types'

export function useCategories() {
	const getAllQuery = (params?: Record<string, unknown>) =>
		useQuery({
			queryKey: ['categories', params],
			queryFn: (): Promise<ICategory[]> => getCategories(params)
		})

	const getBySlugWithChildrenQuery = (slug: string) =>
		useQuery({
			queryKey: ['category', slug],
			queryFn: (): Promise<{
				category: ICategory
				children: ICategory[]
			}> => getBySlugWithChildren(slug)
		})

	return { getAllQuery, getBySlugWithChildrenQuery }
}
