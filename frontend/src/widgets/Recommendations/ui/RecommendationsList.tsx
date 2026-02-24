import { Ad } from '@/src/entities'
import { EAdCondition, IAd } from '@/src/shared/types'

// TODO: TEMP DATA
const ads: IAd[] = [
	{
		id: '1',
		address: 'Екатеринбург',
		categoryId: '1',
		characteristics: [],
		createdAt: '123132534',
		isFinished: false,
		price: 15000,
		slug: 'something',
		title: 'Что-то',
		views: 123,
		sellerId: '1',
		condition: EAdCondition.NEW,
		images: [
			'/images/temp/product1.jpg',
			'/images/temp/product2.jpg',
			'/images/temp/product3.jpg'
		]
	},
	{
		id: '2',
		address: 'Екатеринбург',
		categoryId: '1',
		characteristics: [],
		createdAt: '123132534',
		isFinished: false,
		price: 15000,
		slug: 'something',
		title: 'Что-то',
		views: 123,
		sellerId: '1',
		condition: EAdCondition.NEW,
		images: [
			'/images/temp/product1.jpg',
			'/images/temp/product2.jpg',
			'/images/temp/product3.jpg'
		]
	},
	{
		id: '3',
		address: 'Екатеринбург',
		categoryId: '1',
		characteristics: [],
		createdAt: '123132534',
		isFinished: false,
		price: 15000,
		slug: 'something',
		title: 'Что-то',
		views: 123,
		sellerId: '1',
		condition: EAdCondition.NEW,
		images: [
			'/images/temp/product1.jpg',
			'/images/temp/product2.jpg',
			'/images/temp/product3.jpg'
		]
	},
	{
		id: '4',
		address: 'Екатеринбург',
		categoryId: '1',
		characteristics: [],
		createdAt: '123132534',
		isFinished: false,
		price: 15000,
		slug: 'something',
		title: 'Что-то',
		views: 123,
		sellerId: '1',
		condition: EAdCondition.NEW,
		images: [
			'/images/temp/product1.jpg',
			'/images/temp/product2.jpg',
			'/images/temp/product3.jpg'
		]
	},
	{
		id: '5',
		address: 'Екатеринбург',
		categoryId: '1',
		characteristics: [],
		createdAt: '123132534',
		isFinished: false,
		price: 15000,
		slug: 'something',
		title: 'Что-то',
		views: 123,
		sellerId: '1',
		condition: EAdCondition.NEW,
		images: [
			'/images/temp/product1.jpg',
			'/images/temp/product2.jpg',
			'/images/temp/product3.jpg'
		]
	},
	{
		id: '6',
		address: 'Екатеринбург',
		categoryId: '1',
		characteristics: [],
		createdAt: '123132534',
		isFinished: false,
		price: 15000,
		slug: 'something',
		title: 'Что-то',
		views: 123,
		sellerId: '1',
		condition: EAdCondition.NEW,
		images: [
			'/images/temp/product1.jpg',
			'/images/temp/product2.jpg',
			'/images/temp/product3.jpg'
		]
	}
]

export const Recommendations = () => {
	return (
		<section className='container mt-6'>
			<h3 className='text-2xl font-bold'>Рекомендации для вас</h3>
			<div className='mt-3 grid grid-cols-4 gap-3'>
				{ads.map(ad => (
					<Ad key={ad.id} ad={ad} />
				))}
			</div>
		</section>
	)
}
