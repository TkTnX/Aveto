'use client'

import { useEffect, useState } from 'react'

import {
	createCategoriesTree,
	ErrorMessage,
	Skeleton,
	useAddItemStore,
	useCategories
} from '@/src/shared'
import { ICategory } from '@/src/shared/types'

import { AddItemCategory } from './AddItemCategory'
import { AddAdForm } from '@/src/features'

export const AddItemSteps = () => {
	const { category } = useAddItemStore()
	const { getAllQuery } = useCategories()
	const { data, isPending, error } = getAllQuery()
	const [categories, setCategories] = useState<ICategory[]>([])

	if (error) return <ErrorMessage error={error} />

	useEffect(() => {
		if (data) {
			setCategories(createCategoriesTree(data, null))
		}
	}, [data])
	return (
		<div className='mt-4'>
			{!category ? (
				<div className='flex max-w-85 flex-col gap-1'>
					{isPending
						? [...new Array(5)].map((_, index) => (
								<Skeleton className='h-11 w-full' key={index} />
							))
						: categories.map(cat => (
								<AddItemCategory key={cat.id} cat={cat} />
							))}
				</div>
			) : <AddAdForm />}
		</div>
	)
}
