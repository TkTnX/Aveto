import {
	Dot,
	Flag,
	MessageCirclePlus,
	MoreHorizontal,
	Pin,
	PresentationIcon,
	Trash,
	User,
	UserXIcon
} from 'lucide-react'
import Link from 'next/link'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/src/shared/components/ui'
import { formatPrice } from '@/src/shared/helpers'
import { IAd, IChatUser } from '@/src/shared/types'

interface Props {
	participant: IChatUser
	ad: IAd
}

export const ChatHeaderDropdown = ({ participant, ad }: Props) => {
	console.log(participant)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className='hover:bg-gray/20 flex h-11 min-h-11 w-11 min-w-11 items-center justify-center rounded-full'
					type='button'
				>
					<MoreHorizontal />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='absolute right-0 w-112.5 p-0'>
				<Link
					className='hover:bg-gray/20 flex w-full items-center gap-2 px-4 py-2.5 hover:text-black!'
					href={`/brand/${participant.userId}`}
				>
					<User size={16} fill='#000' />
					Перейти в профиль
				</Link>
				<Link
					className='hover:bg-gray/20 flex w-full items-center gap-2 px-4 py-2.5 hover:text-black!'
					href={`/p/${ad.slug}`}
				>
					<PresentationIcon size={16} fill='#000' />
					{ad.title} <Dot size={12} /> {formatPrice(ad.price)}
				</Link>
				<Link
					className='hover:bg-gray/20 flex w-full items-center gap-2 px-4 py-2.5 hover:text-black!'
					href={`/review?uid=${participant.userId}`}
				>
					<MessageCirclePlus size={16} fill='#000' />
					Оставить отзыв
				</Link>
				<button className='hover:bg-gray/20 flex w-full items-center gap-2 px-4 py-2.5 hover:text-black!'>
					<UserXIcon size={16} fill='#000' />
					Заблокировать
				</button>
				<button className='hover:bg-gray/20 flex w-full items-center gap-2 px-4 py-2.5 hover:text-black!'>
					<Flag size={16} fill='#000' />
					Пожаловаться на объявление
				</button>
				<button className='hover:bg-gray/20 flex w-full items-center gap-2 px-4 py-2.5 hover:text-black!'>
					<Pin size={16} fill='#000' />
					Закрепить
				</button>
				<button className='hover:bg-gray/20 flex w-full items-center gap-2 px-4 py-2.5 hover:text-black!'>
					<Trash size={16} fill='#000' />
					Удалить
				</button>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
