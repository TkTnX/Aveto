import { Category } from '@/src/entities'
import { ICategory } from '@/src/shared/types'

// TODO: TEMP DATA
export const CATEGORIES: ICategory[] = [
	{
		id: '1',
		name: 'Электроника',
		slug: 'electronics',
		image: '/images/temp/1.png',
		children: []
	},
	{
		id: '2',
		name: 'Авто',
		slug: 'auto',
		image: '/images/temp/2.png',
		children: []
	},
	{
		id: '3',
		name: 'Одежда, обувь, аксессуары',
		slug: 'clothes',
		image: '/images/temp/3.png',
		children: []
	},
	{
		id: '4',
		name: 'Животные',
		slug: 'animals',
		image: '/images/temp/4.png',
		children: []
	},
	{
		id: '5',
		name: 'Для дома и дачи',
		slug: 'house',
		image: '/images/temp/5.png',
		children: []
	},
	{
		id: '6',
		name: 'Электроника',
		slug: 'electronics',
		image: '/images/temp/1.png',
		children: []
	},
	{
		id: '7',
		name: 'Авто',
		slug: 'auto',
		image: '/images/temp/2.png',
		children: []
	},
	{
		id: '8',
		name: 'Одежда, обувь, аксессуары',
		slug: 'clothes',
		image: '/images/temp/3.png',
		children: []
	},
	{
		id: '9',
		name: 'Животные',
		slug: 'animals',
		image: '/images/temp/4.png',
		children: []
	},
	{
		id: '10',
		name: 'Для дома и дачи',
		slug: 'house',
		image: '/images/temp/5.png',
		children: []
	}
]

export const CategoriesList = () => {
	return (
		<div className='container hidden grid-cols-5 gap-2 sm:grid lg:grid-cols-7'>
			{CATEGORIES.map(category => (
				<Category key={category.id} category={category} />
			))}
		</div>
	)
}
