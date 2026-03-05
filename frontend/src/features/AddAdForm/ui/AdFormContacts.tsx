import { Field, Input, Label } from "@/src/shared"
import { Control, Controller, FieldValues } from "react-hook-form"

interface Props {
    control: Control<FieldValues, unknown, FieldValues>
}

export const AdFormContacts = ({control}: Props) => {
  return (
		<div className='mt-14'>
			<h2 className='text-2xl font-black'>Контакты</h2>

			<Controller
				name='email'
				control={control}
				render={({ field }) => (
					<Field className='mt-4 gap-0'>
						<Label className='font-bold'>Электронная почта</Label>
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
							мошенников, мы показываем вместо него подменный, а
							звонки переводим вам. Эту защиту нельзя отключить.
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
  )
}
