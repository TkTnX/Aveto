import { Metadata } from 'next'

import { getBySlugWithChildren } from '@/src/api'
import { Category } from '@/src/entities'
import { ErrorMessage, getAllCategoryIds } from '@/src/shared'
import { Recommendations } from '@/src/widgets'

export const metadata: Metadata = {
	title: 'Авето - Объявления на сайте',
	description: 'Авето - Объявления на сайте'
}

const CategoryPage = async ({
	params
}: {
	params: Promise<{ slug: string }>
}) => {
	const slug = (await params).slug
	const data = await getBySlugWithChildren(slug)
	if (!data) return <ErrorMessage error={new Error('Ничего не найдено!')} />
	const categoryIds = getAllCategoryIds(
		data.children[0] || data.category,
		data.category
    )
    
    // TODO: Почему-то сейчас во вкладке все категории не видно подкатегорию Айфоны и iPhone 11
	return (
		<div>
			<div className='container'>
				<h1 className='text-3xl font-black'>{data.category.name}</h1>
				{data?.children && (
					<div className='mt-6 grid grid-cols-2 md:grid-cols-5 gap-2 lg:grid-cols-7'>
						{data.children.map(cat => (
							<Category key={cat.id} category={cat} />
						))}
					</div>
				)}
			</div>
			<Recommendations categories={categoryIds} />
		</div>
	)
}

export default CategoryPage
