'use client'

import Image from 'next/image'

import { Ad } from '@/src/entities'
import { Skeleton, useUserStore } from '@/src/shared'


export const FavoritesList = () => {
	const { user } = useUserStore()
	return (
		<div className='mt-4 w-full'>
			{!user && (
				<div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
					{[...new Array(6)].map((_, index) => (
						<Skeleton key={index} className='h-80 w-full' />
					))}
				</div>
			)}
			{user && user.favorites.length > 0 ? (
				<div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
					{user.favorites.map(fav => (
						<Ad ad={fav.ad} key={fav.id} />
					))}
				</div>
			) : (
				<div>
					<h4 className='text-xl font-black'>
						Сохраняйте объявления
					</h4>
					<p>
						Если вы нашли что-то интересное, нажмите «Добавить в
						избранное» в объявлении или на сердечко в результатах
						поиска.
					</p>
					<div className='relative mt-15 h-80 w-full lg:h-120'>
						<Image
							src={'/images/favorites.png'}
							alt='Favorites'
							fill
						/>
					</div>
				</div>
			)}
		</div>
	)
}
