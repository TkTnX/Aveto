import Link from 'next/link'

import { cn, MessageDropdown, UserAvatar } from '@/src/shared'
import { IMessage } from '@/src/shared/types'

interface Props {
	message: IMessage
	isUserMessage: boolean
}

export const Message = ({ message, isUserMessage }: Props) => {
	return (
		<div
			className={cn('group relative mb-4 flex items-end gap-2', {
				'flex-row-reverse': isUserMessage
			})}
		>
			{!isUserMessage && (
				<Link
					className='relative block h-10 w-10'
					href={`/brand/${message.user.id}`}
				>
					<UserAvatar
						name={message.user.name}
						avatar={message.user.avatar}
					/>
				</Link>
			)}
			<div
				className={cn(
					'bg-gray-2 w-fit max-w-90 rounded-xl px-3 pt-2.5 pb-3',
					{
						'bg-[#e6f6ff]': isUserMessage
					}
				)}
			>
				{message.text}
			</div>
			<p className='text-gray text-xs transition group-hover:hidden'>
				{new Date(message.createdAt).toLocaleTimeString('ru-RU', {
					hour: '2-digit',
					minute: '2-digit'
				})}
			</p>
			<MessageDropdown
				message={message}
				isUserMessage={isUserMessage}
			/>
		</div>
	)
}
