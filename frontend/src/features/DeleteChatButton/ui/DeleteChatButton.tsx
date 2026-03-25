'use client'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useChats } from '@/src/shared'

interface Props {
	chatId: string
}

export const DeleteChatButton = ({ chatId }: Props) => {
	const { deleteChatMutation } = useChats()
	const { mutate, isPending } = deleteChatMutation(chatId)
	const router = useRouter()
	const onClick = () => {
		mutate(chatId, {
			onSuccess: () => router.push('/profile/messenger')
		})
	}
	return (
		<button
			disabled={isPending}
			onClick={onClick}
			className='hover:bg-gray/20 flex w-full items-center gap-2 px-4 py-2.5 hover:text-black!'
		>
			<Trash size={16} fill='#000' />
			Удалить
		</button>
	)
}
