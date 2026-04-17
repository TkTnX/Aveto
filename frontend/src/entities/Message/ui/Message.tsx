import Image from 'next/image'
import Link from 'next/link'

import {
	cn,
	getGridClass,
	IMG_EXP,
	MessageDropdown,
	UserAvatar,
	VIDEO_EXP
} from '@/src/shared'
import { EMessageType, IMessage } from '@/src/shared/types'

interface Props {
	message: IMessage
	isUserMessage: boolean
}

export const Message = ({ message, isUserMessage }: Props) => {
	console.log(message)
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
					'bg-gray-2 w-fit max-w-90 overflow-hidden rounded-xl px-3 pt-2.5 pb-3 wrap-break-word',
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
				{message.media.length > 0 && (
					<div
						className={`grid items-stretch gap-1 ${getGridClass(message.media.length)}`}
					>
						{message.media.map((media, index) => {
							const isImage = IMG_EXP.find(ext =>
								media.toLowerCase().includes(ext)
							)
							const isVideo = VIDEO_EXP.find(ext =>
								media.toLowerCase().includes(ext)
							)
							if (isImage) {
								return (
									// TODO: Сделать открывание картинки
									<div
										key={index}
										className={`relative aspect-square min-h-25 w-full min-w-25 cursor-pointer ${message.media.length === 3 && index === 0 ? 'row-span-2' : ''} `}
									>
										<Image
											src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}${media}`}
											alt={media}
											unoptimized
											fill
											className='rounded-2xl object-cover'
										/>
									</div>
								)
							} else if (isVideo) {
								return (
									// TODO: Сделать открывание видео

									<video
										className={`cursor-pointer rounded-2xl ${message.media.length === 3 && index === 0 ? 'row-span-2' : ''} `}
										controls
										key={index}
										src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}${media}`}
									></video>
								)
							}
						})}
					</div>
				)}
				{message.type === EMessageType.TEXT ? (
					message.text
				) : message.type === EMessageType.VOICE ? (
					<audio
						className='bg-transparent!'
						controls
						preload='metadata'
						src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}${message.text.split('voice-message:')[1]}`}
					/>
				) : (
					''
				)}
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
