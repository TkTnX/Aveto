import { axiosInstance } from '@/src/shared'

export async function getAds(params?: Record<string, string>) {
	const { data } = await axiosInstance.get('ads', { params })

	return data
}
