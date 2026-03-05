import { ICategory } from "@/src/shared/types";

export function createCategoriesTree(
	categories: ICategory[],
	parentId: string | null
): ICategory[] {
	return categories
		.filter(cat => cat.parentId === parentId)
		.map(cat => ({
			...cat,
			children: createCategoriesTree(categories, cat.id)
		}))
}
