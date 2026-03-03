import { Metadata } from 'next'

import { UserInfo } from '@/src/widgets'

export const metadata: Metadata = {
	title: 'Личный кабинет - Авето'
}

const ExtendedPage = () => {
	return (
		<section className='flex-1 max-w-162.5'>
			<h2 className='text-3xl font-bold'>Управление профилем</h2>
			<UserInfo />
		</section>
	)
}

export default ExtendedPage
