import { getAd } from '@/src/api'
import { BreadcrumbsList } from '@/src/shared'
import { BigAd } from '@/src/widgets'

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug

	const ad = await getAd(slug)
	return {
		title: ad.title,
		description: ad.description
	}
}

const AdPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const slug = (await params).slug

	const ad = await getAd(slug)
	return (
		<>
			<BreadcrumbsList
				items={[
					{
						label: ad.category?.parent?.name,
						href: `/c/${ad.category?.parent?.slug}`
					},
					{
						label: ad.category?.name,
						href: `/c/${ad.category?.slug}`
					}
				]}
			/>

			<div className='container'>
				<BigAd ad={ad} />
			</div>
		</>
	)
}

export default AdPage
