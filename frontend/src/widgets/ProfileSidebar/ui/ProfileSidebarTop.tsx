'use client'

import { Camera, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Skeleton, useUserStore } from '@/src/shared'

export const ProfileSidebarTop = () => {
	const { user } = useUserStore()

	if (!user) return <Skeleton className='h-50 w-full' />

	return (
		<div className='border-b pb-3.5'>
			<div className='bg-accent relative flex h-25 w-25 items-center justify-center rounded-full text-6xl'>
				{user.avatar ? (
					<Image
						className='rounded-full object-cover'
						src={user.avatar}
						fill
						alt='Аватарка!'
						unoptimized
					/>
				) : (
					user.name[0]
				)}
				<Link
					href={'/profile/extended'}
					className='absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#ebebeb]'
				>
					<Camera fill='#000' stroke='#ebebeb' />
				</Link>
			</div>
			<p className='mt-3 text-xl font-semibold'>{user.name}</p>
			{/* REVIEWS */}
			<div className='flex items-center gap-1'>
				<p className='text-lg font-bold'>0,0</p>
				<div className='flex items-center gap-1'>
					{[...new Array(5)].map((_, index) => (
						<Star
							fill='#e0e0e0'
							key={index}
							stroke='#e0e0e0'
							size={16}
						/>
					))}
				</div>
				<Link href={'/profile/rating'} className='text-blue'>
					Нет отзывов
				</Link>
			</div>
		</div>
	)
}
