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
					{currImage ? (
						<Image
							fill
							src={currImage}
							alt={`${'image'}-${index}`}
							className='rounded-2xl object-cover'
							unoptimized
						/>
					) : (
						<div className='bg-gray/30 h-full w-full rounded-2xl'></div>
					)}
				</Link>
			))}
		</div>
	)
}
