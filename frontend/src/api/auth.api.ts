import { axiosInstance } from '@/src/shared'
import { LoginSchemaType } from '@/src/shared/schemas'

export async function login(values: LoginSchemaType) {
	const { data } = await axiosInstance.post('auth/login', values)

	return data
}
