import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import {
	Button,
	Field,
	FieldError,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	useAuth
} from '@/src/shared'
import { verifyCodeSchema, VerifyCodeSchemaType } from '@/src/shared/schemas'

export const EnterCodeForm = () => {
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
		console.log(values)
		// mutate(values, {
		// 	onSuccess: () => {},
		// 	onError: error => {
		// 		console.log(error)
		// 	}
		// })
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
			{errors.code?.message && (
				<FieldError className='mt-3' errors={[errors.code]} />
			)}
		</>
	)
}
