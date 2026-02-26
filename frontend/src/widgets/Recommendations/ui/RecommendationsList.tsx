'use client'
import { Ad } from '@/src/entities'
import { ErrorMessage, Skeleton, useAds } from '@/src/shared'

export const Recommendations = () => {
	const { getAllQuery } = useAds()
	const { data, isPending, error } = getAllQuery()

	if (error) return <ErrorMessage error={error} />
	return (
		<section className='container mt-6'>
			<h3 className='text-2xl font-bold'>Рекомендации для вас</h3>
			<div className='mt-3 grid grid-cols-4 gap-3'>
				{isPending
					? [...new Array(6)].map((_, index) => (
							<Skeleton key={index} className='h-75 w-full' />
						))
					: data.map(ad => <Ad key={ad.id} ad={ad} />)}
			</div>
		</section>
	)
}
