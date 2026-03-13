import { axiosInstance } from '@/src/shared'
import { ICategory } from '@/src/shared/types'

export async function getCategories(params?: Record<string, unknown>) {
	const { data } = await axiosInstance.get('categories', { params })

	return data
}

export async function getBySlugWithChildren(
	slug: string
): Promise<{ category: ICategory; children: ICategory[] }> {
	const { data } = await axiosInstance.get(`categories/${slug}`)
	return data
}
