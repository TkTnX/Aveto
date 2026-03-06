import { axiosInstance } from '@/src/shared'

export async function getMe() {
	const { data } = await axiosInstance.get('users/me')
	return data
}

export async function updateUser(formData: FormData) {
	const { data } = await axiosInstance.patch('users', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})

	return data
}
