'use client'
import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	getAllCategoryIds,
	Skeleton
} from '@/src/shared'
import { useCategories } from '@/src/shared'

export const CategoriesAccordion = () => {
	const { getAllQuery } = useCategories()
	const { data, isPending, error } = getAllQuery({ parentId: 'null' })

	if (error) return null

	return (
		<div>
			{isPending ? (
				<div className='flex flex-col gap-2'>
					{[...new Array(5)].map((_, index) => (
						<Skeleton key={index} className='h-10 w-full' />
					))}
				</div>
			) : (
				<Accordion
					type='single'
					className='gap-3'
					collapsible
					defaultValue='category-0'
				>
					{data.map((category, index) => (
						<AccordionItem
							key={category.id}
							value={`category-${index}`}
						>
							<AccordionTrigger className='p-0 text-xs font-bold'>
								{category.children.length > 0 ? (
									category.name
								) : (
									<Link
										className='block w-full'
										href={`?categories=${getAllCategoryIds(category)}`}
									>
										{category.name}
									</Link>
								)}
								{category.children.length > 0 && (
									<ChevronDownIcon className='text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200' />
								)}
							</AccordionTrigger>
							<AccordionContent className='mt-3 flex flex-col gap-2 pl-6'>
								{category.children.map(cat => (
									<Link
										key={cat.id}
										href={`?categories=${getAllCategoryIds(cat)}`}
									>
										{cat.name}
									</Link>
								))}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			)}
		</div>
	)
}
