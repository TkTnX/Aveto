'use client'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { Button, useAuthStore, useChats, useUserStore } from '@/src/shared'
import { IChatRequest } from '@/src/shared/types'

interface Props {
	values: Omit<IChatRequest, 'user1Id'>
}

export const CreateChatButton = ({ values }: Props) => {
	const router = useRouter()
	const { user } = useUserStore()
	const { createChatMutation } = useChats()
	const { mutate, isPending } = createChatMutation()
	const { setOpenLogin } = useAuthStore()

	const onClick = () => {
		if (!user) {
			setOpenLogin(true)
			return null
		}

		mutate(
			{ adId: values.adId, user1Id: user.id, user2Id: values.user2Id },
			{
				onSuccess: data => {
					console.log(data)
					router.push(`/profile/messenger/chat/${data.id}`)
				}
			}
		)
	}

	return (
		<Button
			disabled={isPending}
			onClick={onClick}
			className='bg-blue h-17 justify-center text-lg font-bold text-white'
		>
			Написать сообщение
		</Button>
	)
}
