import { useMutation } from '@tanstack/react-query';



import { login, sendEmailCode, verifyCode } from '@/src/api';
import { EmailSchemaType, LoginSchemaType, VerifyCodeSchemaType } from '@/src/shared/schemas';











































export function useAuth() {
	const loginMutation = () =>
		useMutation({
			mutationKey: ['login'],
			mutationFn: (values: LoginSchemaType) => login(values)
		})

	const sendEmailCodeMutation = () =>
		useMutation({
			mutationKey: ['send phone code'],
			mutationFn: (phone: EmailSchemaType) => sendEmailCode(phone)
		})
	
	const checkCodeMutation = () => useMutation({
		mutationKey: ['verify code'],
		mutationFn: (code: VerifyCodeSchemaType) => verifyCode(code)
	})

	return { loginMutation, sendEmailCodeMutation, checkCodeMutation }
}
