import { useState } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'

import { Field, Input, Label, Switch } from '@/src/shared'

interface Props {
  control: Control<FieldValues, unknown, FieldValues>
}

export const AdFormQuantity = ({control}: Props) => {
	const [showSomeQuantity, setShowSomeQuantity] = useState(false)

	return (
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
							<p className='text-gray mt-1'>Можно не указывать</p>
						</Field>
					)}
				/>
			)}
		</div>
	)
}
