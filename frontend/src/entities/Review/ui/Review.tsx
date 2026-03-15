import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { IReview } from '@/src/shared/types'
import { StarsList, UserReviews } from '@/src/widgets'

interface Props {
	review: IReview
}

export const Review = ({ review }: Props) => {
	return (
		<div className='border-b pb-4'>
			<Link
				href={`/p/${review.ad?.slug}`}
				className='flex items-start justify-between gap-2'
			>
				<Image
					width={80}
					height={80}
					src={review.ad?.images[0] || ''}
					alt={review.ad?.title || 'Заголовок'}
					unoptimized
				/>
				<div>
					<h6>{review.ad?.title}</h6>
				<StarsList rating={review.rating} />
				</div>
			</Link>
			<p className='text-gray mt-1'>{review.text}</p>
		</div>
	)
}
