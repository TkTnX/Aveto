'use client'
import { GalleryVerticalEnd, LockKeyholeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

import {
	AuthModal,
	Skeleton,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	UserAvatar,
	useUserStore
} from '@/src/shared'
import { useUsers } from '@/src/shared/hooks/useUsers'
import { UserMenu } from '@/src/widgets'

export const UserButton = () => {
	const { getMeQuery } = useUsers()
	const { setUser, user } = useUserStore()
	const { data, isPending } = getMeQuery()

	useEffect(() => {
		if (data) {
			console.log(data)
			setUser(data)
		}
	}, [data, setUser])

	return (
		<>
			{isPending ? (
				<Skeleton className='flex h-5 w-25' />
			) : user ? (
				<>
					<Tooltip>
						<TooltipTrigger>
							<Link
								href={'/profile'}
								className='bg-accent relative flex h-10 w-10 items-center justify-center rounded-full'
							>
								<UserAvatar
									name={user.name}
									avatar={user.avatar}
								/>
							</Link>
						</TooltipTrigger>
						<TooltipContent className='px-0'>
							<UserMenu />
						</TooltipContent>
					</Tooltip>
					<Link className='flex items-center gap-1' href={'/profile'}>
						<GalleryVerticalEnd
							className='vsm:size-3.5 size-6'
							size={14}
						/>
						<span className='vsm:inline hidden'>
							Мои объявления
						</span>
					</Link>
				</>
			) : (
				<AuthModal>
					<button className='flex items-center gap-1'>
						<LockKeyholeIcon
							className='vsm:size-3.5 size-6'
							size={14}
						/>
						<span className='vsm:inline hidden'>
							Вход и регистрация
						</span>
					</button>
				</AuthModal>
			)}
		</>
	)
}
