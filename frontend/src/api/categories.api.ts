import { axiosInstance } from '@/src/shared';
import { ICategory } from '@/src/shared/types';








export async function getCategories() {
	const { data } = await axiosInstance.get('categories')

	return data
}

export async function getBySlugWithChildren(
	slug: string
): Promise<{ category: ICategory , children: ICategory[]}> {
	const { data } = await axiosInstance.get(`categories/${slug}`)
	return data
}
