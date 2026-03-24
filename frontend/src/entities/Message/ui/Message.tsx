import Link from 'next/link'

import { cn, MessageDropdown, UserAvatar } from '@/src/shared'
import { IMessage } from '@/src/shared/types'

interface Props {
	message: IMessage
	isUserMessage: boolean
}

export const Message = ({ message, isUserMessage }: Props) => {
	console.log(message.updatedAt !== message.createdAt)
	console.log(message.updatedAt, message.createdAt)
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
					'bg-gray-2 w-fit max-w-90 overflow-hidden rounded-xl px-3 pt-2.5 pb-3',
					{
						'bg-[#e6f6ff]': isUserMessage
					}
				)}
			>
				{message.replyTo && (
					<div className='bg-gray/10 flex w-full gap-2 px-2 py-2'>
						<div className='w-px bg-black' />
						<div>
							<p className='font-black'>
								{message.replyTo.user.name}
							</p>
							<p className='text-wrap break-all'>
								{message.replyTo.text.slice(0, 100)}
							</p>
						</div>
					</div>
				)}
				<div
					className={cn(
						'bg-gray-2 w-fit max-w-90 rounded-xl pt-2.5 pb-3',
						{
							'bg-[#e6f6ff]': isUserMessage
						}
					)}
				>
					{message.text}
				</div>
				{message.updatedAt !== message.createdAt && (
					<p className='text-gray text-xs'>Изменено</p>
				)}
			</div>
			<p className='text-gray text-xs transition group-hover:hidden'>
				{new Date(message.createdAt).toLocaleTimeString('ru-RU', {
					hour: '2-digit',
					minute: '2-digit'
				})}
			</p>
			<MessageDropdown message={message} isUserMessage={isUserMessage} />
		</div>
	)
}
