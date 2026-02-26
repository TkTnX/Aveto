import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

import { ErrorMessage, Skeleton, useCategories } from '@/src/shared'

export const CategoriesModal = () => {
	const { getAllQuery } = useCategories()
	const { data, isPending, error } = getAllQuery()

	if (error) return <ErrorMessage error={error} />

	const parentCategories = data?.filter(cat => !cat.parentId)
	return (
		<>
			<div className='absolute right-0 left-0 z-7 h-[80dvh] overflow-hidden rounded-b-4xl bg-white py-10'>
				<div className='container'>
					<ul className='h-full max-h-[70vh] max-w-75 overflow-y-auto'>
						{isPending
							? [...new Array(10)].map((_, index) => (
									<Skeleton
										className='h-15 w-full not-first:mt-2'
										key={index}
									/>
								))
							: parentCategories?.map(cat => (
									<li
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
											<p className='pt-4'>{cat.name}</p>
										</div>
										<ChevronRight className='mt-4' />
									</li>
								))}
					</ul>
				</div>
			</div>
			<div className='absolute inset-0 top-100 z-6 bg-black/30' />
		</>
	)
}
