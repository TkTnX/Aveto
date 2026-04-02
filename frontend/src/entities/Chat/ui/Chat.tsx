import { Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { DeleteChatButton } from '@/src/features'
import { UserAvatar } from '@/src/shared'
import { IChat } from '@/src/shared/types'

interface Props {
	chat: IChat
}

export const Chat = ({ chat }: Props) => {
	return (
		<div className='hover:bg-gray/20 relative flex gap-2 rounded-lg px-4 pt-3.5 pb-4'>
			<Link
				href={`/profile/messenger/chat/${chat.id}`}
				className='absolute inset-0 z-2'
			></Link>
			<div className='relative'>
				<div className='absolute -top-3 -left-3 h-8 w-8 rounded-full border-2 border-white'>
					<UserAvatar
						name={chat.ad.seller?.name || ''}
						avatar={chat.ad.seller?.avatar}
					/>
				</div>
				<Image
					width={64}
					height={64}
					alt={chat.id}
					src={chat.ad.images[0]}
					className='h-16 w-16 rounded-xl object-cover'
					unoptimized
				/>
			</div>
			<div className='flex-1'>
				<p className='font-black'>{chat.ad.seller?.name}</p>
				<p className='font-black'>{chat.ad.title}</p>
				{chat.messages.length > 0 && (
					<p className='text-gray text-xs'>
						{chat.messages[0].text.slice(0, 100)}
					</p>
				)}
			</div>
			{chat.messages.length > 0 && (
				<p className='text-gray'>
					{new Date(chat.messages[0].createdAt).toLocaleDateString(
						'ru-RU'
					)}
				</p>
			)}

			<DeleteChatButton
				size='sm'
				className='hover:text-red! absolute right-2 bottom-2 z-2 block! w-auto hover:bg-transparent'
				chatId={chat.id}
			/>
		</div>
	)
}
