'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
	Button,
	Field,
	FieldError,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	useAuth,
	useAuthStore
} from '@/src/shared'
import { verifyCodeSchema, VerifyCodeSchemaType } from '@/src/shared/schemas'


export const EnterCodeForm = () => {
	const {setOpenRegister, setOpenConfirm} = useAuthStore()
	const [serverError, setServerError] = useState<null | string>(null)
	const { checkCodeMutation } = useAuth()
	const { mutate, isPending } = checkCodeMutation()
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<VerifyCodeSchemaType>({
		resolver: zodResolver(verifyCodeSchema),
		defaultValues: {
			code: ''
		}
	})
	const onSubmit = (values: VerifyCodeSchemaType) => {
		mutate(values, {
			onSuccess: () => {
				setOpenRegister(true)
				setOpenConfirm(false)
			},
			onError: error => {
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
					name='code'
					control={control}
					render={({ field }) => (
						<Field>
							<InputOTP
								maxLength={6}
								disabled={isPending}
								className='w-full focus-visible:bg-white focus-visible:ring-[#80d4ff]'
								{...field}
							>
								<InputOTPGroup>
									<InputOTPSlot
										className='flex-1'
										index={0}
									/>
									<InputOTPSlot
										className='flex-1'
										index={1}
									/>
									<InputOTPSlot
										className='flex-1'
										index={2}
									/>
									<InputOTPSlot
										className='flex-1'
										index={3}
									/>
									<InputOTPSlot
										className='flex-1'
										index={4}
									/>
									<InputOTPSlot
										className='flex-1'
										index={5}
									/>
								</InputOTPGroup>
							</InputOTP>
						</Field>
					)}
				/>

				<Button type='submit' className='text-base'>
					Проверить
				</Button>
			</form>
			{serverError && <p className='text-red mt-3'>{serverError}</p>}
			{errors.code?.message && (
				<FieldError className='mt-3' errors={[errors.code]} />
			)}
		</>
	)
}
