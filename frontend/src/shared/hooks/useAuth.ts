import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { login, logout, register, sendEmailCode, verifyCode } from '@/src/api'
import {
	EmailSchemaType,
	LoginSchemaType,
	RegisterSchemaType,
	VerifyCodeSchemaType
} from '@/src/shared/schemas'

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
		logoutMutation
	}
}
