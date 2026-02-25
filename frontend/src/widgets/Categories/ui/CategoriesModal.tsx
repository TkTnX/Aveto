import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

import { CATEGORIES } from '@/src/widgets/Categories/ui/CategoriesList'

export const CategoriesModal = () => {
	const parentCategories = CATEGORIES.filter(cat => !cat.parentId)
	return (
		<>
			<div className='rounded-b-8 absolute right-0 left-0 z-7 max-h-[80vh] overflow-hidden bg-white py-10'>
				<div className='container'>
					<ul className='h-full max-h-[70vh] max-w-75 overflow-y-auto'>
						{parentCategories.map(cat => (
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
								<ChevronRight />
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className='absolute inset-0 top-100 z-6 bg-black/30' />
		</>
	)
}
