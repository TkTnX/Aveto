'use client'
import { SearchIcon, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/src/shared'
import { cn } from '@/src/shared/lib'

export const Search = () => {
	const [value, setValue] = useState('')
	return (
		//   TODO: Затемнять bg, когда поиск active (за инпутом бг тоже меняется)
		<form className='bg-blue flex items-center overflow-hidden rounded-lg sm:flex-1 sm:p-0.5 md:h-13'>
			<label className='hidden flex-1 items-center gap-1 rounded-lg bg-white px-2 sm:flex'>
				<SearchIcon size={12} color='var(--color-gray)' />
				<input
					onChange={e => setValue(e.target.value)}
					value={value}
					type='text'
					placeholder='Авето'
					className='placeholder:text-gray w-full py-2 focus-within:outline-0 md:py-3.5'
				/>
				<button
					onClick={() => setValue('')}
					type='button'
					className={cn('pl-1 opacity-0 sm:pl-10', {
						'opacity-100': value.length > 0
					})}
				>
					<X />
				</button>
			</label>
			<Button>
				<SearchIcon size={14} className='sm:hidden' />
				<span className='hidden sm:inline'>Найти</span>
			</Button>
		</form>
	)
}
