'use client'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

import { AdPrice } from '@/src/entities/Ad/ui/AdPrice'
import { AddAdToFavButton } from '@/src/features'
import { IAd } from '@/src/shared/types'


import { AdImages } from './AdImages'

interface Props {
	ad: IAd
}

export const Ad = ({ ad }: Props) => {
	return (
		<div className='group relative'>
			<AdImages slug={ad.slug} images={ad.images} />
			<div className='group-hover:text-red mt-2 flex items-center justify-between gap-1 transition'>
				<Link href={`/p/${ad.slug}`}>{ad.title}</Link>
				<AddAdToFavButton
					className='relative z-4'
					size={18}
					adId={ad.id}
				/>
			</div>
			<AdPrice size={'sm'} price={ad.price} discount={ad.discount} />
			<div className='flex items-center gap-1 text-sm'>
				<MapPin size={14} />
				<p>{ad.address}</p>
			</div>
		</div>
	)
}
