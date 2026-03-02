import Link from 'next/link'

import { PROFILE_LINKS } from '@/src/shared'

import { ProfileSidebarTop } from './ProfileSidebarTop'

export const ProfileSidebar = () => {
	return (
		<div className='w-70'>
			<ProfileSidebarTop />

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
