import { Field, Label } from '@/src/shared'
import { Camera } from 'lucide-react'
import { Control, Controller, FieldValues } from 'react-hook-form'

interface Props {
	control: Control<FieldValues, unknown, FieldValues>
}

export const AdFormPhotos = ({ control }: Props) => {
	return (
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
	)
}
