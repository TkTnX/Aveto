import { getAds } from '@/src/api'
import { AddReview } from '@/src/widgets'

const ReviewPage = async ({
	searchParams
}: {
	searchParams: Promise<{ uid: string; adId?: string }>
}) => {
	const { uid, adId } = await searchParams
	const data = await getAds({ sellerId: uid })
	return <AddReview adId={adId} ads={data} />
}

export default ReviewPage
