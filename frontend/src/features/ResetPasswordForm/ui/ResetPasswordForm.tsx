/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
	Button,
	ErrorMessage,
	Field,
	FieldError,
	Input,
	useAuth,
	useAuthStore
} from '@/src/shared'
import {
	resetPasswordSchema,
	ResetPasswordSchemaType
} from '@/src/shared/schemas'

interface Props {
	code: string
	email: string
}

export const ResetPasswordForm = ({ code, email }: Props) => {
	const [serverError, setServerError] = useState<null | string>(null)
	const { setOpenLogin } = useAuthStore()
	const { resetPasswordMutation } = useAuth()
	const { mutate, isPending } = resetPasswordMutation()
	const router = useRouter()
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<ResetPasswordSchemaType>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
			code,
			email
		}
	})
	const onSubmit = (values: ResetPasswordSchemaType) => {
		mutate(values, {
			onSuccess: () => {
				router.push('/')
				setOpenLogin(true)
			},
			onError: error => {
				console.log(error)
				if (error instanceof AxiosError) {
					setServerError(error?.response?.data.message)
				}
			}
		})
	}
	console.log(errors)
	return (
		<form
			className='mx-auto mt-3 flex flex-col items-center gap-3'
			style={{ maxWidth: '600px' }}
			onSubmit={handleSubmit(onSubmit)}
		>
			<h2 className='text-4xl font-black'>Изменение пароля</h2>
			<Controller
				name='password'
				control={control}
				render={({ field }) => (
					<Field>
						<Input
							disabled={isPending}
							className='focus-visible:bg-white focus-visible:ring-[#80d4ff]'
							{...field}
							placeholder='Пароль'
							type='password'
						/>
					</Field>
				)}
			/>
			{errors.password?.message && (
				<FieldError className='mt-3' errors={[errors.password]} />
			)}
			<Controller
				name='confirmPassword'
				control={control}
				render={({ field }) => (
					<Field>
						<Input
							disabled={isPending}
							className='focus-visible:bg-white focus-visible:ring-[#80d4ff]'
							{...field}
							placeholder='Повторите пароль'
							type='password'
						/>
					</Field>
				)}
			/>
			{errors.confirmPassword?.message && (
				<FieldError
					className='mt-3'
					errors={[errors.confirmPassword]}
				/>
			)}
			<Button
				type='submit'
				className='w-full justify-center text-center text-base'
			>
				Изменить
			</Button>
			{/* @ts-ignore */}
			{errors['']?.message && (
				<ErrorMessage
					className='my-0'
					// @ts-ignore
					error={new Error(errors['']?.message)}
				/>
			)}
			{serverError && (
				<ErrorMessage
					error={new Error(serverError)}
					className='text-let my-0'
				/>
			)}
		</form>
	)
}
