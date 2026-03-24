'use client'
import { MoreHorizontal, Pen, ReplyIcon } from 'lucide-react'
import { useState } from 'react'

import { DeleteMessageButton } from '@/src/features'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/src/shared/components/ui'
import { useChatStore } from '@/src/shared/stores'
import { IMessage } from '@/src/shared/types'

interface Props {
	isUserMessage: boolean
	message: IMessage
}

export const MessageDropdown = ({ isUserMessage, message }: Props) => {
	const [open, setOpen] = useState(false)
	const { setReplyTo, setEditMessage } = useChatStore()
	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<button
					className='hover:bg-gray/20 flex h-8 min-h-8 w-8 min-w-8 items-center justify-center rounded-full bg-white opacity-0 shadow-xl group-hover:opacity-100'
					type='button'
				>
					<MoreHorizontal size={16} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='p-0'>
				<button
					onClick={() => {
						setReplyTo(message)
						setOpen(false)
					}}
					className='hover:bg-gray/20 flex w-full items-center gap-2 px-4 py-2.5 hover:text-black!'
				>
					<ReplyIcon size={16} fill='#000' />
					Ответить
				</button>
				{isUserMessage && (
					<>
						<button
							onClick={() => {
								setEditMessage(message)
								setOpen(false)
							}}
							className='hover:bg-gray/20 flex w-full items-center gap-2 px-4 py-2.5 hover:text-black!'
						>
							<Pen size={16} fill='#000' />
							Изменить
						</button>
						<DeleteMessageButton messageId={message.id} />
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
