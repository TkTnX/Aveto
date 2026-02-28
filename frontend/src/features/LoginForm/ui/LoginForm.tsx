'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
	Button,
	Field,
	FieldError,
	FieldGroup,
	Input,
	useAuth
} from '@/src/shared'
import { loginSchema, LoginSchemaType } from '@/src/shared/schemas'

export const LoginForm = () => {
	const [serverError, setServerError] = useState<null | string>(null)
	const { loginMutation } = useAuth()
	const { mutate, isPending } = loginMutation()
	const { handleSubmit, control } = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			emailOrPhone: '',
			password: ''
		}
	})

	const onSubmit = (values: LoginSchemaType) => {
		mutate(values, {
			onSuccess: data => {
				Cookies.set('accessToken', data.accessToken)
			},
			onError: error => {
				console.log()
				if (error instanceof AxiosError) {
					setServerError(error?.response?.data.message)
				}
			}
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FieldGroup className='gap-3'>
				<Controller
					name='emailOrPhone'
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<Input
								disabled={isPending}
								className='focus-visible:bg-white focus-visible:ring-[#80d4ff]'
								{...field}
								placeholder='Телефон или почта'
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
				<Controller
					name='password'
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<Input
								disabled={isPending}
								className='focus-visible:bg-white focus-visible:ring-[#80d4ff]'
								{...field}
								type='password'
								placeholder='Пароль'
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
			</FieldGroup>
			{serverError && <p className='text-red mt-3'>{serverError}</p>}
			{/* TODO: ADD PASSWORD RESET */}
			<button type='button' className='text-blue hover:text-red mt-3'>
				Забыли пароль?
			</button>
			<Button type='submit' className='mt-6.5 text-base'>
				Войти
			</Button>
		</form>
	)
}
