'use client'
import { Camera, CircleQuestionMarkIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
	Button,
	cn,
	Field,
	Input,
	Label,
	Switch,
	Textarea,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/src/shared'
import { EAdCondition } from '@/src/shared/types'

export const AddAdForm = () => {
	const [condition, setCondition] = useState<null | EAdCondition>(null)
	const [showSomeQuantity, setShowSomeQuantity] = useState(false)
	const { handleSubmit, control } = useForm()

	const onSubmit = values => {
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

			<div className='mt-10'>
				<Label className='font-bold'>Состояние</Label>
				<div className='mt-3 flex items-center gap-1.5'>
					<Button
						onClick={() => setCondition(EAdCondition.NEW)}
						className={cn('bg-[#ebeae8] text-black', {
							'bg-black text-white':
								condition === EAdCondition.NEW
						})}
					>
						Новое
					</Button>
					<Button
						onClick={() => setCondition(EAdCondition.USED)}
						className={cn('bg-[#ebeae8] text-black', {
							'bg-black text-white':
								condition === EAdCondition.USED
						})}
					>
						Б/у
					</Button>
				</div>

				<p className='mt-3 flex gap-1'>
					Какую вещь можно считать новой{' '}
					<Tooltip>
						<TooltipTrigger className='flex items-center'>
							<CircleQuestionMarkIcon
								size={16}
								className='fill-[#b9b9b9] stroke-white'
							/>
						</TooltipTrigger>
						<TooltipContent className='max-w-100 text-lg text-black'>
							Если вы не пользовались вещью, у вас сохранилась
							упаковка и бирки, можете указать, что продаёте новый
							товар. Предмет, которым пользовались хотя бы раз,
							уже нельзя назвать новым.
						</TooltipContent>
					</Tooltip>
				</p>
			</div>
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
			<div className='mt-10'>
				<div className='flex items-center gap-2'>
					<Switch
						checked={showSomeQuantity}
						onCheckedChange={setShowSomeQuantity}
						id='switch'
					/>
					<Label htmlFor='switch'>Несколько штук в наличии</Label>
				</div>
				{showSomeQuantity && (
					<Controller
						name='description'
						control={control}
						render={({ field }) => (
							<Field className='mt-3 gap-0'>
								<Label className='font-bold'>Количество</Label>
								<Input
									// disabled={isPending}
									placeholder='шт'
									className='mt-2 h-13 focus-visible:bg-white focus-visible:ring-[#80d4ff]'
									{...field}
								/>
								<p className='text-gray mt-1'>
									Можно не указывать
								</p>
							</Field>
						)}
					/>
				)}
			</div>

			{/* PHOTOS */}
			<div className='mt-10'>
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<Field className='gap-0'>
							<Label className='font-bold'>Фотографии</Label>
							<p className='text-gray mt-1'>Не более 10</p>
							<label className='bg-accent mt-3 flex h-28.75 max-w-37.5 cursor-pointer items-center justify-center rounded-md hover:opacity-80'>
								<input
									{...field}
									type='file'
									hidden
									accept='image/*'
								/>
								<Camera fill='#000' className='stroke-accent' />
							</label>
						</Field>
					)}
				/>
			</div>

			{/* LOCATION */}
			<div className='mt-10'>
				<Controller
					name='address'
					control={control}
					render={({ field }) => (
						<Field className='gap-0'>
							<Label className='font-bold'>Местоположение</Label>
							<Input
								// disabled={isPending}
								className='mt-2 h-13 focus-visible:bg-white focus-visible:ring-[#80d4ff]'
								{...field}
								// TODO: ADD ADDRESSES LIST

								placeholder='Начните вводить адрес'
							/>
							<p className='text-gray mt-3 flex gap-1'>
								Какую вещь можно считать новой{' '}
								<Tooltip>
									<TooltipTrigger className='flex items-center'>
										<CircleQuestionMarkIcon
											size={16}
											className='fill-[#b9b9b9] stroke-white'
										/>
									</TooltipTrigger>
									<TooltipContent className='max-w-100 text-black'>
										<h3 className='text-2xl font-bold'>
											Почему лучше указывать реальный
											адрес?
										</h3>
										<p className='mt-3'>
											Покупателям будет проще сделать
											выбор и они смогут найти ваше
											объявление при поиске по радиусу,
											району или метро. Это не помешает
											вашему предложению появиться в
											результатах поиска по городу,
											региону или всей России.
										</p>
									</TooltipContent>
								</Tooltip>
							</p>
						</Field>
					)}
				/>
				{/* // TODO: ДОБАВИТЬ КАРТУ  */}
			</div>

			{/* CONTACTS */}
			<div className='mt-14'>
				<h2 className='text-2xl font-black'>Контакты</h2>

				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<Field className='mt-4 gap-0'>
							<Label className='font-bold'>
								Электронная почта
							</Label>
							<Input
								type='email'
								// disabled={isPending}
								className='mt-2 h-13 focus-visible:bg-white focus-visible:ring-[#80d4ff]'
								{...field}
							/>
						</Field>
					)}
				/>
				<Controller
					name='phone'
					control={control}
					render={({ field }) => (
						<Field className='mt-4 gap-0'>
							<Label className='font-bold'>Телефон</Label>
							<p className='mt-1'>
								Чтобы ваш настоящий номер не попал в базы
								мошенников, мы показываем вместо него подменный,
								а звонки переводим вам. Эту защиту нельзя
								отключить.
							</p>
							<Input
								type='tel'
								// disabled={isPending}
								className='mt-2 h-13 focus-visible:bg-white focus-visible:ring-[#80d4ff]'
								{...field}
							/>
						</Field>
					)}
				/>
			</div>
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
