'use client'
import { SearchIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';



import { Button } from '@/src/shared';
import { cn } from '@/src/shared/lib';























export const Search = () => {
	const [value, setValue] = useState('')
	const [isFocused, setIsFocused] = useState(false)

		useEffect(() => {
			if (isFocused) document.body.style.overflow = 'hidden'

			return () => {
				document.body.style.overflow = 'visible'
			}
		}, [isFocused])
	
	return (
		<>
			<form className='bg-blue relative z-6 flex items-center overflow-hidden rounded-lg sm:flex-1 sm:p-0.5 md:h-13'>
				<label className='hidden flex-1 items-center gap-1 rounded-lg bg-white px-2 sm:flex'>
					<SearchIcon size={12} color='var(--color-gray)' />
					<input
						onBlur={() => setIsFocused(false)}
						onFocus={() => setIsFocused(true)}
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
			{isFocused && <div className='absolute inset-0 z-5 bg-black/30' />}
		</>
	)
}
