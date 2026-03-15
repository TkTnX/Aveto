import Image from 'next/image'
import Link from 'next/link'

import { AddAdToFavButton } from '@/src/features'
import { formatPrice } from '@/src/shared'
import { IAd } from '@/src/shared/types'

interface Props {
	ad: IAd
}

export const SidebarAd = ({ ad }: Props) => {
	return (
		<div className='group relative flex items-stretch gap-2 hover:text-black!'>
			<Link className='absolute inset-0' href={`/p/${ad.slug}`}></Link>
			<Image
				src={ad.images[0]}
				alt={ad.title}
				width={100}
				height={75}
				className='h-19 w-25 object-cover'
				unoptimized
			/>
			<div>
				<div className='text-blue flex items-center justify-between'>
					<p className='group-hover:text-red font-black'>
						{ad.title}
					</p>
					<AddAdToFavButton
						className='stroke-blue relative z-3'
						adId={ad.id}
						size={14}
					/>
				</div>
				<p className='font-black'>{formatPrice(ad.price)}</p>
				<p>{ad.address}</p>
			</div>
		</div>
	)
}
