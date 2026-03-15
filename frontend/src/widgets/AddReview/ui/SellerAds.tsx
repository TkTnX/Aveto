'use client'
import { Pen } from 'lucide-react'
import Image from 'next/image'

import { formatPrice, useAddReviewStore } from '@/src/shared'
import { IAd } from '@/src/shared/types'

interface Props {
	ads: IAd[]
}

export const SellerAds = ({ ads }: Props) => {
	const { setAd, ad } = useAddReviewStore()
	return (
		<div className='mt-6 flex gap-6'>
			<p className='font-black w-48.25'>Что вы обсуждали?</p>
			{ad ? (
				<div
					className='relative flex flex-1 items-start gap-2 rounded-xl p-1.5 text-left'
					key={ad.id}
				>
					<button
						onClick={() => setAd(null)}
						className='bg-gray/30 absolute top-1 right-1 rounded-xl p-1.5 hover:opacity-80'
					>
						<Pen />
					</button>
					<Image
						src={ad.images[0]}
						alt={ad.title}
						width={80}
						height={60}
						unoptimized
						className='max-h-15 max-w-20 rounded-lg object-cover'
					/>
					<div>
						<p>{ad.title}</p>
						<p className='font-black'>{formatPrice(ad.price)}</p>
					</div>
				</div>
			) : (
				<div className='flex flex-1 flex-col gap-2'>
					{ads.map(ad => (
						<button
							onClick={() => setAd(ad)}
							className='hover:bg-gray/20 flex items-start gap-2 rounded-xl p-1.5 text-left'
							key={ad.id}
						>
							<Image
								src={ad.images[0]}
								alt={ad.title}
								width={80}
								height={60}
								unoptimized
								className='max-h-15 max-w-20 rounded-lg object-cover'
							/>
							<div>
								<p>{ad.title}</p>
								<p className='font-black'>
									{formatPrice(ad.price)}
								</p>
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
