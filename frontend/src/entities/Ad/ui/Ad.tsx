'use client'
import { Heart, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { AdPrice } from '@/src/entities/Ad/ui/AdPrice'
import { AddAdToFavButton } from '@/src/features'
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
		<div className='group relative'>
			<Link
				onMouseMove={e => handleMouseMove(e)}
				onMouseLeave={handleMouseLeave}
				className='absolute inset-0 z-1'
				href={`/p/${ad.slug}`}
			></Link>

			<div className='relative flex'>
				{ad.quantity > 0 && (
					<div className='bg-green absolute top-2 right-2 z-3 rounded-lg px-2 py-1 text-xs text-white'>
						Есть несколько
					</div>
				)}
				{ad.discount && (
					<div className='bg-red absolute bottom-2 left-2 z-3 rounded-lg px-2 py-1 text-xs text-white'>
						Скидка
					</div>
				)}
				{ad.images.map((_, index) => (
					<div key={index} className='h-30 w-full md:h-58.75'>
						<Image
							fill
							src={ad.images[currentIndex]}
							alt={`${ad.title}-${index}`}
							className='rounded-2xl object-cover'
							unoptimized
						/>
					</div>
				))}
			</div>
			<div className='group-hover:text-red mt-2 flex items-center justify-between gap-1 transition'>
				<h6>{ad.title}</h6>
				<AddAdToFavButton
					className='relative z-4'
					size={18}
					adId={ad.id}
				/>
			</div>
			{/* // TODO: PRICE FORMAT */}
			<AdPrice size={'sm'} price={ad.price} discount={ad.discount} />
			<div className='flex items-center gap-1 text-sm'>
				<MapPin size={14} />
				<p>{ad.address}</p>
			</div>
		</div>
	)
}
