import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { Button, Field, FieldError, Input, useAuth } from '@/src/shared'
import { emailSchema, EmailSchemaType } from '@/src/shared/schemas'

interface Props {
	setIsCodeSent: (bool: boolean) => void
}

export const EnterEmailForm = ({ setIsCodeSent }: Props) => {
	const { sendEmailCodeMutation } = useAuth()
	const { mutate, isPending } = sendEmailCodeMutation()
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
			},
			onError: error => {
				console.log(error)
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
		</>
	)
}
