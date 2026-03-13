'use client'
import { useSearchParams } from 'next/navigation'

import { CatalogAd } from '@/src/entities'
import { ErrorMessage, Skeleton, useAds } from '@/src/shared'

interface Props {
	search: string
}

export const CatalogList = ({ search }: Props) => {
	const searchParams = useSearchParams()
	const { getAllQuery } = useAds()
	const { data, isPending, error } = getAllQuery(
		Object.fromEntries(searchParams)
	)

	if (error) return <ErrorMessage error={error} />
	return (
		<section className='w-full'>
			<h1 className='text-3xl font-black'>
				{search && `«${search}»:`} объявления на Авето{' '}
				<span className='text-gray'>{data?.length}</span>{' '}
			</h1>

			<div className='mt-3 flex w-full flex-col gap-2'>
				{isPending ? (
					[...new Array(5)].map((_, index) => (
						<Skeleton
							style={{ height: '250px' }}
							key={index}
							className='w-full'
						/>
					))
				) : data.length > 0 ? (
					data.map(ad => <CatalogAd key={ad.id} ad={ad} />)
				) : (
					<p className='text-gray text-center text-xl'>
						Ничего не найдено!
					</p>
				)}
			</div>
		</section>
	)
}
