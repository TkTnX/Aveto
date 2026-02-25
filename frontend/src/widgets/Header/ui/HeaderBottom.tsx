'use client'
import { TextSearch, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { CityPicker, Search } from '@/src/features'
import { Button } from '@/src/shared'
import { CategoriesModal } from '@/src/widgets/Categories'

export const HeaderBottom = () => {
	const [openCategories, setOpenCategories] = useState(false)

	useEffect(() => {
		if (openCategories) document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = 'visible'
		}
	}, [openCategories])

	return (
		<>
			<div className='flex items-center justify-between gap-5 lg:gap-10'>
				<Link href={'/'}>
					<Image
						src={'/images/icons/logo.svg'}
						alt='Logo'
						width={100}
						height={30}
					/>
				</Link>
				<div className='flex flex-1 items-center gap-2'>
					<Button
						onClick={() => setOpenCategories(prev => !prev)}
						className='md:h-13 md:px-5!'
					>
						{openCategories ? (
							<X size={16} />
						) : (
							<TextSearch size={16} />
						)}
						<span className='hidden lg:inline'>Все категории</span>
					</Button>
					<Search />
				</div>
				<CityPicker />
			</div>
			{openCategories && <CategoriesModal />}
		</>
	)
}
