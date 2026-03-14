import { Review } from '@/src/entities'
import { Skeleton, useUserStore } from '@/src/shared'

export const WrittenReviewsList = () => {
	const { user } = useUserStore()

	if (!user) return <Skeleton className='mt-5 h-50 w-full' />
	return (
		<div className='mt-5'>
			{user.writtenReviews?.length > 0 ? (
				user.writtenReviews.map(review => (
					<Review review={review} key={review.id} />
				))
			) : (
				<>
					<h5 className='text-lg font-bold'>Здесь ещё ничего нет</h5>
					<p className='mt-3'>
						Оставить отзыв можно в профиле продавца
					</p>
				</>
			)}
		</div>
	)
}
