'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
	Button,
	Field,
	FieldError,
	FieldGroup,
	Input,
	useAuth,
	useAuthStore
} from '@/src/shared'
import { registerSchema, RegisterSchemaType } from '@/src/shared/schemas'

export const RegisterForm = () => {
	const { email, setOpenLogin, setOpenRegister } = useAuthStore()
	const router = useRouter()
	const [serverError, setServerError] = useState<null | string>(null)
	const { registerMutation } = useAuth()
	const { mutate, isPending } = registerMutation()
	const { handleSubmit, control } = useForm<RegisterSchemaType>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			password: '',
			emailOrPhone: email
		}
	})

	const onSubmit = (values: RegisterSchemaType) => {
		mutate(values, {
			onSuccess: data => {
				Cookies.set('accessToken', data.accessToken)
				setOpenRegister(false)
				router.push('/profile')
			},
			onError: error => {
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
					name='name'
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<Input
								disabled={isPending}
								className='focus-visible:bg-white focus-visible:ring-[#80d4ff]'
								{...field}
								placeholder='Имя'
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
			<Button type='submit' className='mt-6.5 text-base'>
				Готово
			</Button>
			<p className='mt-3'>
				Уже есть профиль?{' '}
				<button
					onClick={() => {
						setOpenLogin(true)
						setOpenRegister(false)
					}}
					type='button'
					className='text-blue hover:text-red'
				>
					Войти
				</button>
			</p>
		</form>
	)
}
