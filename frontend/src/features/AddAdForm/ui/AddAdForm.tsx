'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
	Button,
	Field,
	Input,
	Label,
	Textarea,
	useAds,
	useUserStore
} from '@/src/shared'
import { addAdSchema, AddAdSchemaType } from '@/src/shared/schemas'
import { EAdCondition, IAd, ICategory } from '@/src/shared/types'

import { AdFormCondition } from './AdFormCondition'
import { AdFormContacts } from './AdFormContacts'
import { AdFormPhotos } from './AdFormPhotos'
import { AdFormQuantity } from './AdFormQuantity'
import { LocationMap } from './LocationMap'

interface Props {
	category: string
}

export const AddAdForm = ({ category }: Props) => {
	const router = useRouter()
	const { user } = useUserStore()
	const [photos, setPhotos] = useState<File[]>([])
	const { createMutation } = useAds()
	const { mutate, isPending } = createMutation()
	const [location, setLocation] = useState('')
	const [condition, setCondition] = useState<null | EAdCondition>(null)
	const { handleSubmit, control } = useForm<AddAdSchemaType>({
		resolver: zodResolver(addAdSchema),
		defaultValues: {
			title: '',
			description: '',
			email: user?.email,
			phone: user?.phone
		}
	})

	const onSubmit = (values: AddAdSchemaType) => {
		const formData = new FormData()
		Object.entries(values).map(([key, value]) => {
			formData.set(key, value)
		})

		if (photos) {
			photos.forEach(file => {
				formData.append('images', file)
			})
		}

		if (condition !== null) {
			formData.set('condition', EAdCondition[condition])
		}
		formData.set('address', location)
		formData.set('categoryId', category)
		mutate(formData, {
			onSuccess: (data: IAd) => {
				router.push(`/p/${data.slug}`)
			}
		})
	}
	return (
		<form className='mt-3 max-w-158.75' onSubmit={handleSubmit(onSubmit)}>
			{/* TITLE */}
			<Controller
				name='title'
				control={control}
				render={({ field }) => (
					<Field className='gap-0'>
						<Label className='font-bold'>Название объявления</Label>
						<Input
							disabled={isPending}
							className='mt-2 h-13 focus-visible:bg-white focus-visible:ring-[#80d4ff]'
							{...field}
						/>
						<p className='text-gray mt-1'>
							Например, «Комбинезон зимний Reima 104 см» или
							«Apple Watch 3 стальной ремешок»
						</p>
					</Field>
				)}
			/>
			{/* CONDITION */}

			<AdFormCondition
				condition={condition}
				setCondition={setCondition}
			/>
			{/* DESCRIPTION */}
			<div className='mt-10'>
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<Field className='gap-0'>
							<Label className='font-bold'>Описание</Label>
							<Textarea
								disabled={isPending}
								className='mt-2 min-h-40 focus-visible:bg-white focus-visible:ring-[#80d4ff]'
								{...field}
							/>
							<p className='text-gray mt-1'>
								Не указывайте в описании телефон и e-mail — для
								этого есть отдельные поля
							</p>
						</Field>
					)}
				/>
			</div>

			{/* PRICE */}
			<Controller
				name='price'
				control={control}
				render={({ field }) => (
					<Field className='mt-10 gap-0'>
						<Label className='font-bold'>Цена</Label>
						<Input
							disabled={isPending}
							className='mt-2 h-13 focus-visible:bg-white focus-visible:ring-[#80d4ff]'
							{...field}
							placeholder='₽'
							type='number'
						/>
					</Field>
				)}
			/>
			{/* QUANTITY */}
			<AdFormQuantity control={control} />

			{/* PHOTOS */}
			<AdFormPhotos photos={photos} setPhotos={setPhotos} />

			{/* LOCATION */}
			<LocationMap location={location} setLocation={setLocation} />

			{/* CONTACTS */}
			<AdFormContacts control={control} />

			<div className='mt-10 flex items-center gap-2'>
				<Button type='submit' className='bg-black text-white'>
					Разместить
				</Button>
				<Button className='bg-accent text-black'>
					Сохранить и выйти
				</Button>
			</div>
			<p className='text-gray mt-2'>
				Вы публикуете объявление и данные в нём, чтобы их мог посмотреть
				кто угодно в интернете. Вы также соглашаетесь с правилами Авето.
			</p>
		</form>
	)
}
