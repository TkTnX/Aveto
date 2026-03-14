import { Metadata } from 'next'

import { ReviewsTabs } from '@/src/widgets'

export const metadata: Metadata = {
	title: 'Личный кабинет - Отзывы - Авето'
}

const RatingPage = () => {
	return (
		<section className='w-full'>
			<h2 className='text-3xl font-black'>Мои отзывы</h2>
			<ReviewsTabs />
		</section>
	)
}

export default RatingPage
