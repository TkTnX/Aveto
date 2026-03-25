'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

import { Message } from '@/src/entities'
import { SendMessageForm } from '@/src/features'
import {
	ErrorMessage,
	Skeleton,
	socket,
	useChats,
	useChatStore,
	useUserStore
} from '@/src/shared'

import { BigChatHeader } from './BigChatHeader'

interface Props {
	chatId: string
}

export const BigChat = ({ chatId }: Props) => {
	const queryClient = useQueryClient()
	const { setChatId } = useChatStore()
	const { user } = useUserStore()
	const { getChatQuery } = useChats()
	const { data, isPending, error } = getChatQuery(chatId)

	useEffect(() => {
		if (!data) return
		setChatId(data.id)
	}, [data, setChatId])

	useEffect(() => {
		if (!socket.connected) {
			socket.on('connect', () => {
				socket.emit('join', chatId)
			})
		} else {
			socket.emit('join', chatId)
		}
	}, [chatId])

	useEffect(() => {
		const handler = () => {
			queryClient.invalidateQueries({ queryKey: ['get chat', chatId] })
		}

		socket.on('message', handler)

		return () => {
			socket.off('message', handler)
		}
	}, [chatId, queryClient])

	if (error) return <ErrorMessage error={error} />
	if (isPending) return <Skeleton className='h-screen w-full max-w-157.5' />
	return (
		<div className='sticky top-0 w-full max-w-157.5 rounded-lg'>
			<BigChatHeader participants={data.participants} ad={data.ad} />
			<div className='flex h-125 max-h-125 flex-col overflow-y-auto pt-20'>
				{data.messages.length > 0 ? (
					data.messages.map(message => (
						<Message
							isUserMessage={user?.id === message.userId}
							key={message.id}
							message={message}
						/>
					))
				) : (
					<p className='text-gray my-auto text-center'>
						Сообщений нет
					</p>
				)}
			</div>
			<SendMessageForm chatId={chatId} />
		</div>
	)
}
