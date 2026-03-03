import Cookies from 'js-cookie';



import { axiosInstance } from '@/src/shared';
import { EditUserWithImageSchemaType } from '@/src/shared/schemas';










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


export async function updateUser(formData: FormData) {
	// TODO: Сделать универсальный instance для получения токенов!
		const token = Cookies.get('accessToken')

	if (!token) throw Error('Вы не авторизованы!')
	const { data } = await axiosInstance.patch('users', formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data"	
		},
		
	})

	return data
}