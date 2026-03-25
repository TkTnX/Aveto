import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { ChatHeaderDropdown, useUserStore } from '@/src/shared'
import { IAd, IChatUser } from '@/src/shared/types'

interface Props {
	ad: IAd
	participants: IChatUser[]
}

export const BigChatHeader = ({ ad, participants }: Props) => {
	const { user } = useUserStore()
	return (
		<div className='flex items-center gap-4 p-2.5 shadow-2xl'>
			<Link href={'/profile/messenger'}>
				<ArrowLeft />
			</Link>
			<Link href={`/p/${ad.slug}`} className='flex flex-1 gap-2'>
				<Image
					src={ad.images[0]}
					alt={ad.title}
					width={48}
					height={48}
					unoptimized
					className='rounded-2xl object-cover w-12 h-12'
				/>
				<div>
					<h6 className='font-black'>{ad.title}</h6>
					<p className='text-xs'>{ad.description.slice(0, 50)}</p>
				</div>
			</Link>
			{user && (
				<ChatHeaderDropdown
					ad={ad}
					participant={
						participants.find(
							participant => participant.userId !== user.id
						)!
					}
				/>
			)}
		</div>
	)
}
