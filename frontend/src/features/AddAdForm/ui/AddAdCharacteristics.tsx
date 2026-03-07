import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button, Input, useAddItemStore } from '@/src/shared'

export const AddAdCharacteristics = () => {
	const { setCharacteristics, characteristics } = useAddItemStore()
	const [name, setName] = useState('')
	const [value, setValue] = useState('')

	const onClickAdd = () => {
		setCharacteristics({ name, value })
		setName('')
		setValue('')
	}

	return (
		<div className='mt-10'>
			<p className='font-bold'>Характеристики</p>
			<div className='mt-3'>
				{characteristics.length > 0 && (
					<div className='flex flex-col'>
						{characteristics.map((char, index) => (
							<div
								className='flex items-center gap-2 border-y py-3'
								key={index}
							>
								<p className='text-gray'>{char.name}:</p>{' '}
								<p>{char.value}</p>
							</div>
						))}
					</div>
				)}
				<div className='mt-3 flex items-center gap-2'>
					<Input
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder='Название'
					/>
					<Input
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder='Значение'
					/>
				</div>
			</div>
			<Button
				onClick={onClickAdd}
				disabled={!name || !value}
				type='button'
				className='mt-4 w-full justify-center bg-black disabled:pointer-events-none disabled:opacity-50'
			>
				<Plus /> Добавить
			</Button>
		</div>
	)
}
