import { ICategory } from '@/src/shared/types'

export function getAllCategoryIds(
	category: ICategory,
	parentCategory?: ICategory,
) {
	const ids = [category.id, parentCategory?.id]

	if (category.children && category.children.length > 0) {
		for (const child of category.children) {
			ids.push(...getAllCategoryIds(child))
		}
	}

	return ids
}
