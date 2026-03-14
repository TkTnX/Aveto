'use client'

import { Camera } from 'lucide-react'
import Link from 'next/link'

import { cn, Skeleton, UserAvatar, UserBadge } from '@/src/shared'
import { IUser } from '@/src/shared/types'
import { UserReviews } from '@/src/widgets'

interface Props {
	user: IUser
	className?: string
	isProfilePage?: boolean
}

export const ProfileSidebarTop = ({
	user,
	className,
	isProfilePage = false
}: Props) => {
	if (!user) return <Skeleton className='h-50 w-full' />

	return (
		<div className={cn('pb-3.5', className)}>
			<div className='bg-accent relative flex h-25 w-25 items-center justify-center rounded-full text-6xl'>
				<UserAvatar name={user.name} avatar={user.avatar} />
				{isProfilePage && (
					<Link
						href={'/profile/extended'}
						className='absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#ebebeb]'
					>
						<Camera fill='#000' stroke='#ebebeb' />
					</Link>
				)}
			</div>
			<p className='mt-3 text-xl font-semibold'>{user.name}</p>
			{/* REVIEWS */}
			<UserReviews user={user} rating={user.rating} />
			<p>На Авето с {new Date(user.createdAt).getFullYear()}</p>
			<div className='mt-2 flex items-center gap-2'>
				{user.isPhoneVerified && (
					<UserBadge confirmed='Телефон подтверждён' />
				)}
				{user.isEmailVerified && (
					<UserBadge confirmed='Почта подтверждена' />
				)}
			</div>
		</div>
	)
}
