import { Metadata } from 'next'

import { AddItemSteps } from '@/src/widgets'

export const metadata: Metadata = {
	title: 'Новое объявление - Объявления на сайте Авето'
}

const AddItemPage = () => {
	return (
		<section className='container mt-14'>
			<h2 className='text-3xl font-black'>Новое объявление</h2>
			<AddItemSteps />
		</section>
	)
}

export default AddItemPage
