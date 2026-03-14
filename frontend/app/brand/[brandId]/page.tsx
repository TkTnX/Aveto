import { getBrand } from '@/src/api'
import { ProfileSidebarTop, UserAdsList } from '@/src/widgets'

interface Props {
	params: Promise<{ brandId: string }>
}

export async function generateMetadata({ params }: Props) {
	const { brandId } = await params
	const user = await getBrand(brandId)
	return {
		title: `${user.name} - официальная страница во всех регионах, отзыввы на Авето | Недвижимость, транспорт, работа, услуги, вещи`
	}
}

const BrandPage = async ({ params }: Props) => {
	const { brandId } = await params

	const user = await getBrand(brandId)

	return (
		<div className='container mt-10 flex items-start gap-9'>
			<ProfileSidebarTop user={user} />
			<UserAdsList user={user} />
		</div>
	)
}

export default BrandPage
