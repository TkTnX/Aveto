import { Star } from 'lucide-react'

import { cn, Skeleton, UserReviewsModal } from '@/src/shared'
import { IUser } from '@/src/shared/types'

interface Props {
	className?: string
	rating: number
	user?: IUser
}

export const UserReviews = ({ className, rating, user }: Props) => {
	if (!user) return <Skeleton className='h-10 w-full' />
	return (
		<div className={cn('flex items-center gap-1', className)}>
			{user && <p className='text-lg font-bold'>{rating?.toFixed(1)}</p>}
			<div className='flex items-center gap-1'>
				{[...new Array(rating)].map((_, index) => (
					<Star
						fill='#ffb021'
						key={index}
						stroke='#ffb021'
						size={16}
					/>
				))}
				{[...new Array(5 - rating)].map((_, index) => (
					<Star
						fill='#e0e0e0'
						key={index}
						stroke='#e0e0e0'
						size={16}
					/>
				))}
			</div>
			<UserReviewsModal user={user}>
				<p className='text-blue'>
					{rating === 0 ? 'Нет отзывов' : `Все отзывы`}
				</p>
			</UserReviewsModal>
		</div>
	)
}
