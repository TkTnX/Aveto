'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
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
import { emailSchema, EmailSchemaType } from '@/src/shared/schemas'

export const EnterEmailForm = () => {
	const [serverError, setServerError] = useState<null | string>(null)
	const { setIsCodeSent, setEmail, openConfirm } = useAuthStore()
	const { sendEmailCodeMutation } = useAuth()
	const { mutate, isPending } = sendEmailCodeMutation(openConfirm!)
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<EmailSchemaType>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: ''
		}
	})
	const onSubmit = (values: EmailSchemaType) => {
		mutate(values, {
			onSuccess: () => {
				setIsCodeSent(true)
				setEmail(values.email)
				setServerError(null)
			},
			onError: error => {
				console.log(error)
				if (error instanceof AxiosError) {
					setServerError(error?.response?.data.message)
				}
			}
		})
	}

	return (
		<>
			<form
				className='mt-3 flex items-center gap-3'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<Field>
							<Input
								disabled={isPending}
								className='focus-visible:bg-white focus-visible:ring-[#80d4ff]'
								{...field}
								placeholder='Почта'
							/>
						</Field>
					)}
				/>

				<Button type='submit' className='text-base'>
					Продолжить
				</Button>
			</form>
			{errors.email?.message && (
				<FieldError className='mt-3' errors={[errors.email]} />
			)}
			{serverError && (
				<ErrorMessage
					className='my-0 mt-3 text-left'
					error={new Error(serverError)}
				/>
			)}
		</>
	)
}
