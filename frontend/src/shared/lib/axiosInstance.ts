import axios from 'axios'
import Cookies from 'js-cookie'

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
})

// TODO: Сделать refresh авторизации

axiosInstance.interceptors.request.use(
	config => {
		const token = Cookies.get('accessToken')

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	error => Promise.reject(error)
)
