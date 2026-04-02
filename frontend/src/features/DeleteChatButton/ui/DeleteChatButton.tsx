'use client'
import { useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { cn, useChats } from '@/src/shared'

interface Props {
	chatId: string
	className?: string
	size: 'sm' | 'lg'
}

export const DeleteChatButton = ({ chatId, className, size }: Props) => {
	const { deleteChatMutation } = useChats()
	const { mutate, isPending } = deleteChatMutation(chatId)
	const router = useRouter()
	const queryClient = useQueryClient()
	const onClick = () => {
		mutate(chatId, {
			onSuccess: () => {
				router.push('/profile/messenger')
				queryClient.invalidateQueries({ queryKey: ['get user chats'] })
			}
		})
	}
	return (
		<button
			disabled={isPending}
			onClick={onClick}
			className={cn(
				'hover:bg-gray/20 flex w-full items-center gap-2 px-4 py-2.5 hover:text-black!',
				className
			)}
		>
			<Trash size={16} fill={size === 'lg' ? '#000' : 'transparent'} />
			{size === 'lg' && 'Удалить'}
		</button>
	)
}
