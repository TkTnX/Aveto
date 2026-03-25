'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, Mic, Plus, SendHorizonal, X } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Field, Input,  useChatStore, useMessages } from '@/src/shared'
import { sendMessageSchema, SendMessageSchemaType } from '@/src/shared/schemas'

interface Props {
	chatId: string
}

export const SendMessageForm = ({ chatId }: Props) => {
	const { replyTo, setReplyTo, editMessage } = useChatStore()
	const { sendMessageMutation, editMessageMutation } = useMessages()
	const { mutate: sendMutate, isPending: sendPending } = sendMessageMutation()
	const { mutate: editMutate, isPending: editPending } = editMessageMutation()
	const isPending = sendPending || editPending
	const mutate = editMessage ? editMutate : sendMutate
	const {
		handleSubmit,
		control,
		setValue,
		formState: { isValid }
	} = useForm<SendMessageSchemaType>({
		resolver: zodResolver(sendMessageSchema),
		defaultValues: {
			text: editMessage?.text || ''
		}
	})

	const onSubmit = (values: SendMessageSchemaType) => {
		mutate(
			{
				...values,
				chatId,
				replyTo: replyTo?.id,
				messageId: editMessage?.id
			},
			{
				onSuccess: () => {
					setValue('text', '')
					setReplyTo(null)
				}
			}
		)
	}

	useEffect(() => {
		if (!editMessage) return

		setValue('text', editMessage.text)
	}, [editMessage, setValue])

	return (
		<>
			{replyTo && (
				<div className='flex w-full gap-2 bg-white px-4 py-2'>
					<div className='h-15 w-px bg-black' />
					<div>
						<p className='font-black'>{replyTo.user.name}</p>
						<p>{replyTo.text.slice(0, 100)}</p>
					</div>
					<button
						className='ml-auto'
						onClick={() => setReplyTo(null)}
					>
						<X />
					</button>
				</div>
			)}
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
								disabled={isPending}
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
		</>
	)
}
