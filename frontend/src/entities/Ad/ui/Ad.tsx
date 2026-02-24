'use client'
import { Heart, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { IAd } from '@/src/shared/types'

interface Props {
	ad: IAd
}

export const Ad = ({ ad }: Props) => {
	// TODO: Перенести в другой компонент этот функционал
	const [currentIndex, setCurrentIndex] = useState(0)

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, width } = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - left

		const zoneWidth = width / ad.images.length
		const newIndex = Math.floor(x / zoneWidth)

		setCurrentIndex(newIndex)
	}

	const handleMouseLeave = () => setCurrentIndex(0)

	return (
		<div className=''>
			<Link className='hover:text-red' href={`/p/${ad.slug}`}>
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
								className='rounded-2xl'
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
