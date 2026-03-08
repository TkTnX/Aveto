import { Metadata } from 'next'

import { FavoritesList } from '@/src/widgets'

export const metadata: Metadata = {
	title: 'Объявления | Избранное | Авето'
}

const FavoritesPage = () => {
	return (
		<section className='w-full'>
			<h2 className='text-3xl font-black'>Избранное</h2>
			<FavoritesList />
		</section>
	)
}

export default FavoritesPage
