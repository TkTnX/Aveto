import { axiosInstance } from '@/src/shared'

export async function uploadRecord(formData: FormData) {
	const { data } = await axiosInstance.post('upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})

	return data
}

export async function uploadFiles(formData: FormData) {
	const { data } = await axiosInstance.post('upload/files', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})

	return data
}
