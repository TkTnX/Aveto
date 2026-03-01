'use client'
import { Heart, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { IAd } from '@/src/shared/types'

import { getIndexOnMove } from '../helpers'

interface Props {
	ad: IAd
}

export const Ad = ({ ad }: Props) => {
	const { handleMouseLeave, currentIndex, handleMouseMove } = getIndexOnMove(
		ad.images.length
	)

	return (
		<div className=''>
			<Link href={`/p/${ad.slug}`}>
				<div
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					className='relative flex'
				>
					{ad.images.map((_, index) => (
						<div key={index} className='h-58.75 w-full'>
							<Image
								fill
								src={ad.images[currentIndex]}
								alt={`${ad.title}-${index}`}
								className='rounded-2xl object-cover'
							/>
						</div>
					))}
				</div>
				<div className='mt-2 flex items-center justify-between'>
					<h6>{ad.title}</h6>
					<button>
						<Heart />
					</button>
				</div>
			</Link>
			<p className='font-bold'>{ad.price}₽</p>
			<div className='flex items-center gap-1 text-sm'>
				<MapPin size={14} />
				<p>{ad.address}</p>
			</div>
		</div>
	)
}
