'use client'
import Link from 'next/link'

import { PROFILE_LINKS, useUserStore } from '@/src/shared'

import { ProfileSidebarTop } from './ProfileSidebarTop'

export const ProfileSidebar = () => {
	const { user } = useUserStore()
	return (
		<div className='w-full sm:w-70'>
			{user && (
				<ProfileSidebarTop
					isProfilePage={true}
					className='border-b'
					user={user}
				/>
			)}

			<nav className='mt-3'>
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
		</div>
	)
}
