import { Dot } from 'lucide-react'
import Link from 'next/link'

import { AddAdToFavButton } from '@/src/features'
import { formatPrice, UserAvatar } from '@/src/shared'
import { EAdCondition, IAd } from '@/src/shared/types'
import { UserReviews } from '@/src/widgets'

import { AdImages } from './AdImages'

interface Props {
	ad: IAd
}

export const CatalogAd = ({ ad }: Props) => {
	return (
		<div className='relative grid grid-cols-2 items-start gap-4 md:grid-cols-3'>
			<Link href={`/p/${ad.slug}`} className='absolute inset-0'></Link>
			<AdImages slug={ad.slug} className={'flex-1'} images={ad.images} />
			<div className='col-[2/4] flex-1 md:col-auto'>
				<div className='flex items-center justify-between'>
					<h6 className='text-lg'>{ad.title}</h6>
					<AddAdToFavButton adId={ad.id} size={16} />
				</div>
				<p className='text-lg font-black'>{formatPrice(ad.price)}</p>
				<p className='mt-2'>
					{ad.condition === EAdCondition.NEW ? 'Новый' : 'Б/у'}
				</p>
				<p className='flex items-center'>
					{' '}
					<Dot className='fill-green' /> {ad.address}
				</p>
				<p className='text-gray'>{ad.description.slice(0, 300)}</p>
				<p className='text-gray'>{ad.category?.name}</p>
			</div>
			{ad.seller && (
				<div className='col-[1/3] flex flex-col items-start justify-between gap-2 lg:col-auto'>
					<Link
						href={`/brand/${ad.seller.id}`}
						className='relative block h-10 w-10'
					>
						{' '}
						<UserAvatar
							name={ad.seller.name}
							avatar={ad.seller.avatar}
						/>
					</Link>
					<div>
						<Link
							className='text-blue text-sm tracking-wider'
							href={`/brands/${ad.seller.id}`}
						>
							{ad.seller.name}
						</Link>
						<UserReviews />
					</div>
				</div>
			)}
		</div>
	)
}
