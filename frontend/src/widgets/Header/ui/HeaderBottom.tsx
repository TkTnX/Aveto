import { TextSearch } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { CityPicker, Search } from '@/src/features'
import { Button } from '@/src/shared'

export const HeaderBottom = () => {
	return (
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
				<Button className='md:h-13 md:px-5!'>
					<TextSearch size={16} />
					<span className='hidden lg:inline'>Все категории</span>
				</Button>
				<Search />
			</div>
			<CityPicker />
		</div>
	)
}
