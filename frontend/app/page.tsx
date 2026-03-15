import { CategoriesList, HomeSidebar, Recommendations } from '@/src/widgets'

export default function Home() {
	return (
		<>
			<CategoriesList />
			<div className='container mt-6 flex w-full items-start gap-9'>
				<Recommendations className='flex-1' />
				<HomeSidebar />
			</div>
		</>
	)
}
