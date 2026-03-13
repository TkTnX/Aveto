'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Button, Input } from '@/src/shared'
import { CategoriesAccordion } from '@/src/widgets'

export const CatalogSidebar = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [price, setPrice] = useState<{
		from: null | string
		to: null | string
	}>({ from: null, to: null })

	const onClick = () => {
		const params = new URLSearchParams(searchParams)
		if (price.from) {
			params.set('priceFrom', price.from)
		}

		if (price.to) {
			params.set('priceTo', price.to)
		}

		router.push(`?${params.toString()}`)
	}
	return (
		<div className='w-full sm:max-w-50 md:w-75'>
			<CategoriesAccordion />
			<div className='mt-4'>
				<p className='font-black'>Цена, ₽ </p>
				<div className='mt-3 flex items-center gap-2'>
					<Input
						min={0}
						onChange={e =>
							setPrice({ from: e.target.value, to: price.to })
						}
						placeholder='От'
						type='number'
					/>
					<Input
						onChange={e =>
							setPrice({ to: e.target.value, from: price.from })
						}
						placeholder='до'
						type='number'
					/>
				</div>
				<Button
					onClick={onClick}
					className='mt-3 w-full justify-center'
				>
					Показать объявления
				</Button>
			</div>
		</div>
	)
}
