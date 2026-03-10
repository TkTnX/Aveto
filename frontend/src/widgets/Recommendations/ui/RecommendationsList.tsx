'use client'
import { Ad } from '@/src/entities'
import { ErrorMessage, Skeleton, useAds } from '@/src/shared'

interface Props {
	categories?: (string | undefined)[]
}

export const Recommendations = ({ categories }: Props) => {
	const { getAllQuery } = useAds()
	const { data, isPending, error } = getAllQuery({
		categories: categories?.join(',')
	})

	if (error) return <ErrorMessage error={error} />
	return (
		<section className='container mt-6'>
			<h3 className='text-2xl font-bold'>Рекомендации для вас</h3>
			<div className='mt-3 grid grid-cols-2 gap-3 md:grid-cols-4'>
				{isPending ? (
					[...new Array(6)].map((_, index) => (
						<Skeleton key={index} className='h-75 w-full' />
					))
				) : data.length > 0 ? (
					data.map(ad => <Ad key={ad.id} ad={ad} />)
				) : (
					<p className='col-span-4 text-center'>Ничего не найдено!</p>
				)}
			</div>
		</section>
	)
}
