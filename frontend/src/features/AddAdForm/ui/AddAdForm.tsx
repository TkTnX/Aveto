'use client'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Field, Input, Label, Textarea } from '@/src/shared'
import { EAdCondition } from '@/src/shared/types'

import { AdFormCondition } from './AdFormCondition'
import { AdFormContacts } from './AdFormContacts'
import { AdFormPhotos } from './AdFormPhotos'
import { AdFormQuantity } from './AdFormQuantity'
import { LocationMap } from './LocationMap'

export const AddAdForm = () => {
	const [location, setLocation] = useState('')
	const [condition, setCondition] = useState<null | EAdCondition>(null)
	const { handleSubmit, control } = useForm()

	const onSubmit = (values: unknown) => {
		console.log(values)
	}

	return (
		<form className='mt-3 max-w-158.75' onSubmit={handleSubmit(onSubmit)}>
			{/* TITLE */}
			<Controller
				name='name'
				control={control}
				render={({ field }) => (
					<Field className='gap-0'>
						<Label className='font-bold'>Название объявления</Label>
						<Input
							// disabled={isPending}
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
								// disabled={isPending}
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
							// disabled={isPending}
							className='mt-2 h-13 focus-visible:bg-white focus-visible:ring-[#80d4ff]'
							{...field}
							placeholder='₽'
						/>
						<p className='text-gray mt-1'>
							Например, «Комбинезон зимний Reima 104 см» или
							«Apple Watch 3 стальной ремешок»
						</p>
					</Field>
				)}
			/>
			{/* QUANTITY */}
			<AdFormQuantity control={control} />

			{/* PHOTOS */}
			<AdFormPhotos control={control} />

			{/* LOCATION */}
			<LocationMap
				control={control}
				location={location}
				setLocation={setLocation}
			/>

			{/* CONTACTS */}
			<AdFormContacts control={control} />

			<div className='mt-10 flex items-center gap-2'>
				<Button className='bg-black text-white'>Разместить</Button>
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
