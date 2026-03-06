import { Camera } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { Field, Label } from '@/src/shared'

interface Props {
	setPhotos: Dispatch<SetStateAction<File[]>>
	photos: File[]
}

export const AdFormPhotos = ({ setPhotos, photos }: Props) => {
	return (
		<div className='mt-10'>
			<Field className='gap-0'>
				<Label className='font-bold'>Фотографии</Label>
				<p className='text-gray mt-1'>Не более 10</p>
				<label className='bg-accent mt-3 flex h-28.75 max-w-37.5 cursor-pointer items-center justify-center rounded-md hover:opacity-80'>
					<input
						type='file'
						hidden
						multiple
						accept='image/*'
						onChange={e => {
							if (e.target.files) {
								setPhotos([
									...photos,
									...Array.from(e.target.files)
								])
							}
						}}
					/>
					<Camera fill='#000' className='stroke-accent' />
				</label>
			</Field>
		</div>
	)
}
