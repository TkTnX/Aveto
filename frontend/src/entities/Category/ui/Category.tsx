import Image from 'next/image'
import Link from 'next/link'

import { ICategory } from '@/src/shared/types'

interface Props {
	category: ICategory
}

export const Category = ({ category }: Props) => {
	return (
		<div className='relative h-22.5 w-full grid-flow-dense rounded-lg bg-[#f2f1f0] px-3.5 py-2.5 hover:brightness-95'>
			<Link
				className='absolute inset-0 z-2'
				href={`/category/${category.slug}`}
			></Link>
			<p className=''>{category.name}</p>
			{category.image && (
				<div className='absolute right-0 bottom-0 h-full w-full'>
					<Image
						className='object-cover'
						fill
						src={category.image}
						alt={category.slug}
					/>
				</div>
			)}
		</div>
	)
}
