import { getAds } from '@/src/api'
import { AddReview } from '@/src/widgets'

const ReviewPage = async ({
	searchParams
}: {
	searchParams: Promise<{ uid: string }>
}) => {
	const { uid } = await searchParams
	const data = await getAds({ sellerId: uid })
	return <AddReview ads={data} />
}

export default ReviewPage
