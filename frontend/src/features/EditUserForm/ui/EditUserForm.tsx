'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
	Button,
	Field,
	FieldError,
	Input,
	Skeleton,
	UserAvatar,
	useUserStore
} from '@/src/shared'
import { Label } from '@/src/shared'
import { useUsers } from '@/src/shared/hooks/useUsers'
import { editUserSchema, EditUserSchemaType } from '@/src/shared/schemas'

export const EditUserForm = () => {
	const queryClient = useQueryClient()
	const [image, setImage] = useState<File | null>(null)
	const { user } = useUserStore()
	const { updateMutation } = useUsers()
	const { mutate, isPending } = updateMutation()
	const {
		control,
		formState: { errors },
		handleSubmit
	} = useForm<EditUserSchemaType>({
		resolver: zodResolver(editUserSchema),
		defaultValues: {
			name: user?.name || ''
		}
	})
	const onSubmit = (values: EditUserSchemaType) => {
		const formData = new FormData()
		if (image) {
			formData.set('avatar', image)
		}

		formData.set('name', values.name)

		mutate(formData, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['get me'] })
			}
		})
	}

	if (!user) return <Skeleton className='h-10 w-full' />

	return (
		<>
			<label className='bg-accent relative mt-4 flex h-30 w-30 cursor-pointer items-center justify-center overflow-hidden rounded-full text-3xl'>
				<UserAvatar name={user.name} avatar={user.avatar} />
				<input
					onChange={e => {
						if (e.target.files?.[0]) {
							setImage(e.target.files[0])
						}
					}}
					hidden
					type='file'
					accept='image/*'
				/>
				<div className='absolute inset-0 flex items-center justify-center bg-black/30'>
					<Camera color='#fff' />
				</div>
			</label>
			<form
				className='mt-3 flex flex-col items-start gap-3'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<Field className='gap-0'>
							<Label className='font-bold'>Имя</Label>
							<p>Как вы хотите, чтобы к вам обращались?</p>
							<Input
								disabled={isPending}
								className='mt-2 focus-visible:bg-white focus-visible:ring-[#80d4ff]'
								{...field}
								placeholder='Имя'
							/>
						</Field>
					)}
				/>

				<Button type='submit' className='bg-black text-base'>
					Сохранить
				</Button>
			</form>
			{errors.name?.message && (
				<FieldError className='mt-3' errors={[errors.name]} />
			)}
		</>
	)
}
