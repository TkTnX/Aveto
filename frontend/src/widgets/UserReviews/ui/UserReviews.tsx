
import { cn, Skeleton, UserReviewsModal } from '@/src/shared'
import { IUser } from '@/src/shared/types'
import { StarsList } from './StarsList'

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
			<StarsList rating={rating} />
			<UserReviewsModal user={user}>
				<p className='text-blue'>
					{rating === 0 ? 'Нет отзывов' : `Все отзывы`}
				</p>
			</UserReviewsModal>
		</div>
	)
}
