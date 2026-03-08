'use client'

import Link from 'next/link'

import { Ad } from '@/src/entities'
import { Skeleton, useUserStore } from '@/src/shared'

export const UserAdsList = () => {
	const { user } = useUserStore()

	if (!user) return <Skeleton className='h-100 w-full' />
	return (
		<section>
			<h2 className='text-3xl font-black'>Мои объявления</h2>
			{user.ads.length > 0 ? (
				<div className='mt-3 grid grid-cols-2 gap-3 md:grid-cols-3'>
					{user.ads.map(ad => (
						<Ad key={ad.id} ad={ad} />
					))}
				</div>
			) : (
				<div>
					<h4 className='text-2xl'>Объявлений пока нет</h4>
					<p>Но это легко исправить - разместите первое</p>

					<Link
						href={'/additem'}
						className='mt-4 flex w-fit items-center gap-1 rounded-lg bg-black px-3.75 py-2 text-white hover:text-white! hover:brightness-90'
					>
						Разместить объявление
					</Link>
				</div>
			)}
		</section>
	)
}
