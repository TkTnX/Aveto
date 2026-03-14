import Link from 'next/link'

import { LogoutButton } from '@/src/features'
import { PROFILE_LINKS, Skeleton, UserAvatar, useUserStore } from '@/src/shared'
import { UserReviews } from '@/src/widgets'

export const UserMenu = () => {
	const { user } = useUserStore()

	if (!user) return <Skeleton className='h-10 w-10 rounded-full' />

	return (
		<div className='py-4'>
			<div className='relative mx-4 h-10 w-10'>
				<UserAvatar name={user.name} avatar={user.avatar} />
			</div>
			<Link href={`/brand/${user.id}`}>
				<UserReviews
					user={user}
					rating={user.rating}
					className='mt-3 border-y px-4 py-2 text-black'
				/>
			</Link>
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
