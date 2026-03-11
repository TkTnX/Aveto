import Cookies from 'js-cookie';



import { axiosInstance } from '@/src/shared';
import { EmailSchemaType, LoginSchemaType, RegisterSchemaType, ResetPasswordSchemaType, VerifyCodeSchemaType } from '@/src/shared/schemas';
































export async function login(values: LoginSchemaType) {
	const { data } = await axiosInstance.post('auth/login', values)

	return data
}

export async function register(values: RegisterSchemaType) {
	const { data } = await axiosInstance.post('auth/register', values)

	return data
}

export async function sendEmailCode(email: EmailSchemaType, theme: string) {
	const { data } = await axiosInstance.post(`auth/send-code/${theme}`, email)

	return data
}

export async function verifyCode(code: VerifyCodeSchemaType) {
	const { data } = await axiosInstance.post('auth/verify', code)

	return data
}

export async function resetPassword(values: ResetPasswordSchemaType) {
	const { data } = await axiosInstance.patch('auth/reset-password', values)

	return data
}

export async function logout() {
	const { data } = await axiosInstance.post('auth/logout', {})

	return data
}
