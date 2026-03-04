'use client'

import { Camera, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Skeleton, UserAvatar, useUserStore } from '@/src/shared'
import { UserReviews } from '@/src/widgets'

export const ProfileSidebarTop = () => {
	const { user } = useUserStore()

	if (!user) return <Skeleton className='h-50 w-full' />

	return (
		<div className='border-b pb-3.5'>
			<div className='bg-accent relative flex h-25 w-25 items-center justify-center rounded-full text-6xl'>
				<UserAvatar name={user.name} avatar={user.avatar} />
				<Link
					href={'/profile/extended'}
					className='absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#ebebeb]'
				>
					<Camera fill='#000' stroke='#ebebeb' />
				</Link>
			</div>
			<p className='mt-3 text-xl font-semibold'>{user.name}</p>
			{/* REVIEWS */}
			<UserReviews />
		</div>
	)
}
