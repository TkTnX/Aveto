import { useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'

import { useChatStore, useMessages } from '@/src/shared'

interface Props {
	messageId: string
}

export const DeleteMessageButton = ({ messageId }: Props) => {
	const {chatId} = useChatStore()
	const { deleteMessageMutation } = useMessages()
	const { mutate, isPending } = deleteMessageMutation()
	const queryClient = useQueryClient()
	const onClick = () =>
		mutate(messageId, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['get chat', chatId]
				})
			}
		})
	return (
		<button
			onClick={onClick}
			disabled={isPending}
			className='hover:bg-gray/20 flex w-full items-center gap-2 px-4 py-2.5 hover:text-black!'
		>
			<Trash size={16} fill='#000' />
			Удалить
		</button>
	)
}
