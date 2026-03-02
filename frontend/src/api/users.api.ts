import Cookies from 'js-cookie'

import { axiosInstance } from '@/src/shared'

export async function getMe() {
	const token = Cookies.get('accessToken')

	if (!token) throw Error('Вы не авторизованы!')

	const { data } = await axiosInstance.get('users/me', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return data
}
