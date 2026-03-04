import Link from 'next/link'

import { PROFILE_LINKS, Skeleton, UserAvatar, useUserStore } from '@/src/shared'
import { UserReviews } from '@/src/widgets'
import { LogoutButton } from '@/src/features'

export const UserMenu = () => {
	const { user } = useUserStore()

	if (!user) return <Skeleton className='h-10 w-10 rounded-full' />

	return (
		<div className='py-4'>
			<div className='relative h-10 w-10 mx-4'>
				<UserAvatar name={user.name} avatar={user.avatar} />
			</div>
			<UserReviews className='mt-3 border-y px-4 py-2 text-black' />
			<nav className='mt-3 px-4'>
				<ul className='flex flex-col gap-2'>
					{PROFILE_LINKS.map(link => (
						<li key={link.href}>
							<Link href={link.href} className='text-blue'>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<LogoutButton />
		</div>
	)
}
