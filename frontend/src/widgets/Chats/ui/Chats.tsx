import { Search } from 'lucide-react'

import { Input } from '@/src/shared'

import { ChatsList } from './ChatsList'

export const Chats = () => {
	return (
		<div className='mt-4 w-full'>
			<label className='flex h-10 w-full items-center rounded-lg bg-[#f1f1f1] px-2'>
				<Search className='cursor-pointer' size={14} />
				<Input
					className='border-0 bg-none! focus-within:outline-none focus-visible:border-none! focus-visible:ring-0'
					placeholder='Поиск по имени'
				/>
			</label>
			<ChatsList />
		</div>
	)
}
