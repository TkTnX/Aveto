import { Dot } from 'lucide-react'
import Link from 'next/link'

import { UserAvatar } from '@/src/shared'
import { IReview } from '@/src/shared/types'
import { StarsList } from '@/src/widgets'

interface Props {
	review: IReview
}

export const Review = ({ review }: Props) => {
	return (
		<div className='border-b pb-4'>
			<div className='flex items-center gap-1'>
				<div className='relative h-10 w-10'>
					<UserAvatar
						name={review.receiver?.name || ''}
						avatar={review.receiver?.avatar}
					/>
				</div>
				<div>
					<p className='font-black'>{review.receiver?.name}</p>
					<p className='text-gray text-xs'>
						{new Date(review.createdAt).toLocaleDateString(
							'ru-RU',
							{ day: '2-digit', month: 'long', year: 'numeric' }
						)}
					</p>
				</div>
			</div>
			<div className='mt-4 flex items-start justify-between gap-2'>
				<div className='flex flex-wrap items-center gap-1 text-xs'>
					<StarsList rating={review.rating} />{' '}
					<p className='text-gray'>{review.howFinished}</p>
					<Dot size={12} className='text-gray' />
					<Link href={`/p/${review.ad?.slug}`} className='text-gray'>
						{review.ad?.title}
					</Link>
				</div>
			</div>
			<p className='mt-1'>{review.text}</p>
		</div>
	)
}
