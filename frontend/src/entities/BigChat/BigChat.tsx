'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

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
	const router = useRouter()
	const downRef = useRef<HTMLDivElement | null>(null)
	const queryClient = useQueryClient()
	const { setChatId } = useChatStore()
	const { user } = useUserStore()
	const { getChatQuery } = useChats()
	const { data, isPending, error } = getChatQuery(chatId)

	useEffect(() => {
		if (!isPending && data) {
			const isParticipant = data.participants.some(
				p => p.userId === user?.id
			)

			if (!isParticipant) {
				router.replace('/')
			}
		}
	}, [isPending, data, user, router])

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
		downRef.current?.scrollIntoView({ behavior: 'smooth' })
		if (!data) return
		setChatId(data.id)
	}, [data])

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

	const isParticipant = data.participants.some(p => p.userId === user?.id)
	if (!isParticipant) return null

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
				<div ref={downRef} />
			</div>
			<SendMessageForm chatId={chatId} />
		</div>
	)
}
