import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/src/shared'

import { getIndexOnMove } from '../helpers'

interface Props {
	slug: string
	images: string[]
	className?: string
}

export const AdImages = ({ slug, images, className }: Props) => {
	const { handleMouseLeave, currentIndex, handleMouseMove } = getIndexOnMove(
		images.length
	)
	const currImage = images[currentIndex]

	if(!currImage) return null
	return (
		<div
			onMouseMove={e => handleMouseMove(e)}
			onMouseLeave={handleMouseLeave}
			className={cn('relative flex', className)}
		>
			{images.map((_, index) => (
				<Link
					href={`/p/${slug}`}
					key={index}
					className='h-30 w-full md:h-58.75'
				>
					<Image
						fill
						src={images[currentIndex]}
						alt={`${'image'}-${index}`}
						className='rounded-2xl object-cover'
						unoptimized
					/>
				</Link>
			))}
		</div>
	)
}
