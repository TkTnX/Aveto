'use client'
import { Category } from '@/src/entities'
import { ErrorMessage, Skeleton, useCategories } from '@/src/shared'

export const CategoriesList = () => {
	const { getAllQuery } = useCategories()
	const { data, isPending, error } = getAllQuery()
	if (error) return <ErrorMessage error={error} />

	const parentCategories = data?.filter(cat => !cat.parentId)
	
	return (
		<div className='container hidden grid-cols-5 gap-2 sm:grid lg:grid-cols-7'>
			{isPending
				? [...new Array(10)].map((_, index) => (
						<Skeleton key={index} className='h-22.5 w-full' />
					))
				: parentCategories?.map(category => (
						<Category key={category.id} category={category} />
					))}
		</div>
	)
}
