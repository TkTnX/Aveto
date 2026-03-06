import { axiosInstance } from '@/src/shared'

export async function getAds(params?: Record<string, string>) {
	const { data } = await axiosInstance.get('ads', { params })

	return data
}

export async function createAd(formData: FormData) {
	const { data } = await axiosInstance.post('ads', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})

	return data
}
