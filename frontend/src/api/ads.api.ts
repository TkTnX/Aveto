import { axiosInstance } from '@/src/shared'

export async function getAds() {
	const { data } = await axiosInstance.get('ads')

	return data
}
