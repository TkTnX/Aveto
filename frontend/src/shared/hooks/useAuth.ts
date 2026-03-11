import { useMutation, UseMutationOptions } from '@tanstack/react-query';



import { login, logout, register, resetPassword, sendEmailCode, verifyCode } from '@/src/api';
import { EmailSchemaType, LoginSchemaType, RegisterSchemaType, ResetPasswordSchemaType, VerifyCodeSchemaType } from '@/src/shared/schemas';
































export function useAuth() {
	const loginMutation = () =>
		useMutation({
			mutationKey: ['login'],
			mutationFn: (values: LoginSchemaType) => login(values)
		})

	const sendEmailCodeMutation = (theme: string) =>
		useMutation({
			mutationKey: ['send email code'],
			mutationFn: (email: EmailSchemaType) => sendEmailCode(email, theme)
		})

	const checkCodeMutation = () =>
		useMutation({
			mutationKey: ['verify code'],
			mutationFn: (code: VerifyCodeSchemaType) => verifyCode(code)
		})

	const registerMutation = () =>
		useMutation({
			mutationKey: ['register'],
			mutationFn: (values: RegisterSchemaType) => register(values)
		})
	
	const resetPasswordMutation = () =>
		useMutation({
			mutationKey: ['reset password'],
			mutationFn: (values: ResetPasswordSchemaType) =>
				resetPassword(values)
		})

	const logoutMutation = (
		options?: Omit<
			UseMutationOptions<unknown, unknown, unknown>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['logout'],
			mutationFn: () => logout(),
			...options
		})

	return {
		loginMutation,
		sendEmailCodeMutation,
		checkCodeMutation,
		registerMutation,
		logoutMutation,
		resetPasswordMutation
	}
}
