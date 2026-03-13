import { BreadcrumbsList } from '@/src/shared'
import { CatalogList, CatalogSidebar } from '@/src/widgets'

interface Props {
	searchParams: Promise<{ search: string }>
}

export async function generateMetadata({ searchParams }: Props) {
	const { search } = await searchParams

	return {
		title: `${search || 'Каталог'} - Aveto | Недвижимость, транспорт, работа, услуги, вещи`
	}
}
const CatalogPage = async ({ searchParams }: Props) => {
	const { search } = await searchParams
	return (
		<>
			<BreadcrumbsList
				items={[
					{
						href: search ? `/catalog?search=${search}` : '/',
						label: search || "Каталог"
					}
				]}
			/>
			<div className='container sm:flex-row flex-col mt-3 flex items-start gap-9'>
				<CatalogSidebar />
				<CatalogList search={search} />
			</div>
		</>
	)
}

export default CatalogPage
