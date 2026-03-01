import { axiosInstance } from '@/src/shared'
import {
	EmailSchemaType,
	LoginSchemaType,
	RegisterSchemaType,
	VerifyCodeSchemaType
} from '@/src/shared/schemas'

export async function login(values: LoginSchemaType) {
	const { data } = await axiosInstance.post('auth/login', values)

	return data
}

export async function register(values: RegisterSchemaType) {
	const { data } = await axiosInstance.post('auth/register', values)

	return data
}

export async function sendEmailCode(email: EmailSchemaType) {
	const { data } = await axiosInstance.post('auth/send-code', email)

	return data
}

export async function verifyCode(code: VerifyCodeSchemaType) {
	const { data } = await axiosInstance.post('auth/verify', code)

	return data
}
