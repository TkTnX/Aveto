'use client'
import { Chat } from '@/src/entities'
import { ErrorMessage, Skeleton, useChats } from '@/src/shared'

export const ChatsList = () => {
	const { getUserChatsQuery } = useChats()
	const { data, isPending, error } = getUserChatsQuery()

	if (error) return <ErrorMessage error={error} />
	return (
		<div className='mt-5 flex flex-col gap-3'>
			{isPending
				? [...new Array(4)].map((_, index) => (
						<Skeleton key={index} className='h-25 w-full' />
					))
				: data.length > 0 &&
					data.map(chat => <Chat key={chat.id} chat={chat} />)}
		</div>
	)
}
