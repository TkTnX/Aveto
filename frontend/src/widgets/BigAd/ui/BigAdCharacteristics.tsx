'use client'
import { useState } from 'react'

import { ICharacteristic } from '@/src/shared/types'

interface Props {
	characteristics: ICharacteristic[]
}

export const BigAdCharacteristics = ({ characteristics }: Props) => {
	const [openChars, setOpenChars] = useState(false)

	return (
		<div className='mt-12'>
			<h3 className='text-2xl font-black'>Характеристики</h3>
			<div className='mt-4 grid grid-cols-2'>
				{characteristics.length > 0 ? (
					characteristics.slice(0, openChars ? -1 : 6).map(char => (
						<div className='flex items-center gap-1' key={char.id}>
							<p className='text-gray'>{char.name}:</p>{' '}
							<p>{char.value}</p>
						</div>
					))
				) : (
					<p>Характеристики не указаны</p>
				)}
			</div>
			{characteristics.length > 0 && !openChars && (
				<button
					onClick={() => setOpenChars(true)}
					className='text-blue hover:text-red mt-2'
				>
					Все характеристики
				</button>
			)}
		</div>
	)
}
