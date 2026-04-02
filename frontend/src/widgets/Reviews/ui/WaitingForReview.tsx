'use client'
import Image from 'next/image'
import Link from 'next/link'

import {
	ErrorMessage,
	Skeleton,
	useChats,
	UserAvatar,
	useUserStore
} from '@/src/shared'

export const WaitingForReview = () => {
	const { user } = useUserStore()
	const { getUserChatsQuery } = useChats()
	const { data, isPending, error } = getUserChatsQuery()
	if (isPending) return <Skeleton className='mt-8 h-56 w-full' />
	if (error) return <ErrorMessage error={error} />

	return (
		<div className='mt-8 flex flex-col gap-10'>
			{data.length > 0 ? (
				data.map(chat => (
					<div
						className='flex items-start gap-5 text-xl font-bold'
						key={chat.id}
					>
						<div className='relative'>
							<div className='absolute -top-5 -left-5 h-10 w-10'>
								<UserAvatar
									name={chat.ad.seller?.name || ''}
									avatar={chat.ad.seller?.avatar}
								/>
							</div>
							<Link href={`/p/${chat.ad.id}`}>
								<Image
									src={chat.ad.images[0]}
									alt={chat.ad.title}
									width={100}
									height={100}
									unoptimized
									className='h-25 w-25 rounded-lg object-cover'
								/>
							</Link>
						</div>
						<div>
							<Link href={`/p/${chat.adId}`}>
								{chat.ad.title}
							</Link>
							<Link
								className='text-blue mt-3 flex w-full items-center text-sm hover:text-black!'
								href={`/review?uid=${chat.participants.find(p => p.userId !== user?.id)?.userId}&adId=${chat.adId}`}
							>
								Оставить отзыв
							</Link>
						</div>
					</div>
				))
			) : (
				<>
					<h6 className='text-gray text-xl font-black'>
						Список пуст
					</h6>
					<p className='text-gray mt-2'>
						Здесь вы найдёте продавцов, с которыми общались в
						последнее время.
					</p>
				</>
			)}
		</div>
	)
}
