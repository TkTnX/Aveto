'use client'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { ErrorMessage, Skeleton, useCategories } from '@/src/shared'

export const CategoriesModal = () => {
	const [activeParentCategoryIndex, setActiveParentCategoryIndex] =
		useState(0)
	const { getAllQuery } = useCategories()
	const { data, isPending, error } = getAllQuery()

	if (error) return <ErrorMessage error={error} />

	const parentCategories = data?.filter(cat => !cat.parentId)
	const childCategories = parentCategories?.[activeParentCategoryIndex]
	return (
		<>
			<div className='absolute right-0 left-0 z-7 h-[80dvh] overflow-hidden rounded-b-4xl bg-white py-10'>
				<div className='container flex items-start gap-10'>
					<ul className='h-full max-h-[70vh] max-w-75 overflow-y-auto'>
						{isPending
							? [...new Array(10)].map((_, index) => (
									<Skeleton
										className='h-15 w-full not-first:mt-2'
										key={index}
									/>
								))
							: parentCategories?.map((cat, index) => (
									<li
										onMouseMove={() =>
											setActiveParentCategoryIndex(index)
										}
										className='hover:bg-gray-2 flex cursor-pointer items-center justify-between gap-2 pb-4'
										key={cat.id}
									>
										<div className='flex items-center gap-2'>
											{cat.image && (
												<Image
													src={cat.image}
													width={80}
													height={80}
													alt={cat.name}
												/>
											)}
											<p className='hidden pt-4 sm:block'>
												{cat.name}
											</p>
										</div>
										<ChevronRight className='mt-4' />
									</li>
								))}
					</ul>
					<div className='flex-1'>
						<Link
							className='flex items-center gap-2 text-2xl font-bold transition'
							href={`/c/${childCategories?.slug}`}
						>
							{childCategories?.name} <ChevronRight size={28} />
						</Link>
						<ul className='vsm:grid-cols-2 mt-4 grid w-full gap-2 md:grid-cols-3'>
							{childCategories?.children.map(cat => (
								<li key={cat.id}>
									<Link href={`/c/${cat.slug}`}>
										{cat.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div className='absolute inset-0 top-100 z-6 bg-black/30' />
		</>
	)
}
