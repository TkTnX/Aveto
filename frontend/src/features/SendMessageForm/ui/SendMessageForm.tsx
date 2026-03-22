'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, Mic, Plus, SendHorizonal } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { Field, Input } from '@/src/shared'
import { sendMessageSchema, SendMessageSchemaType } from '@/src/shared/schemas'

export const SendMessageForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isValid }
	} = useForm<SendMessageSchemaType>({
		resolver: zodResolver(sendMessageSchema),
		defaultValues: {
			text: ''
		}
	})

	const onSubmit = (values: SendMessageSchemaType) => {
		console.log(values)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex items-center gap-1'
		>
			<button
				className='hover:bg-gray/20 flex h-11 min-h-11 w-11 min-w-11 items-center justify-center rounded-full'
				type='button'
			>
				<Plus size={24} />
			</button>
			<Controller
				name='text'
				control={control}
				render={({ field }) => (
					<Field>
						<Input
							// disabled={isPending}
							className='focus-visible:bg-white focus-visible:ring-[#80d4ff]'
							{...field}
							placeholder='Сообщение'
						/>
					</Field>
				)}
			/>
			{isValid ? (
				<button
					className='hover:bg-gray/20 flex h-11 min-h-11 w-11 min-w-11 items-center justify-center rounded-full'
					type='submit'
				>
					<SendHorizonal />
				</button>
			) : (
				<>
					<button
						className='hover:bg-gray/20 flex h-11 min-h-11 w-11 min-w-11 items-center justify-center rounded-full'
						type='button'
					>
						<Camera size={24} />
					</button>
					<button
						className='hover:bg-gray/20 flex h-11 min-h-11 w-11 min-w-11 items-center justify-center rounded-full'
						type='button'
					>
						<Mic size={24} />
					</button>
				</>
			)}
		</form>
	)
}
