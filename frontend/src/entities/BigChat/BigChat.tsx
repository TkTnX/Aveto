'use client'

import { Message } from '@/src/entities'
import { SendMessageForm } from '@/src/features'
import { ErrorMessage, Skeleton, useChats, useChatStore, useUserStore } from '@/src/shared'

import { BigChatHeader } from './BigChatHeader'
import { useEffect } from 'react'

interface Props {
	chatId: string
}

export const BigChat = ({ chatId }: Props) => {
	const {setChatId} = useChatStore()
	const { user } = useUserStore()
	const { getChatQuery } = useChats()
	const { data, isPending, error } = getChatQuery(chatId)

	useEffect(() => {
		if(!data) return
		setChatId(data.id)
	}, [data, setChatId])


	if (error) return <ErrorMessage error={error} />
	if (isPending) return <Skeleton className='h-screen w-full max-w-157.5' />
	return (
		<div className='sticky top-0 w-full max-w-157.5 rounded-lg'>
			<BigChatHeader participants={data.participants} ad={data.ad} />
			<div className='flex h-125 max-h-125 flex-col overflow-y-auto pt-20'>
				{data.messages.map(message => (
					<Message
						isUserMessage={user?.id === message.userId}
						key={message.id}
						message={message}
					/>
				))}
			</div>
			<SendMessageForm chatId={chatId} />
		</div>
	)
}
