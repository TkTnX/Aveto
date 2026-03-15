/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { SidebarAd } from '@/src/entities'
import { SIDEBAR_SERVICES } from '@/src/shared'
import { IAd } from '@/src/shared/types'

export const HomeSidebar = () => {
	const [recentWatched, setRecentWatched] = useState<IAd[]>([])
	useEffect(() => {
		setRecentWatched(
			JSON.parse(localStorage.getItem('recentWatched') || '[]')
		)
	}, [])

	return (
		<div className='hidden max-w-50 sm:block sm:max-w-max lg:w-75'>
			{recentWatched.length > 0 && (
				<div>
					<h6 className='font-black'>Вы смотрели</h6>
					<div className='mt-4 flex flex-col gap-2'>
						{recentWatched.map(recentAd => (
							<SidebarAd key={recentAd.id} ad={recentAd} />
						))}
					</div>
				</div>
			)}
			<div className='mt-5'>
				<h6 className='font-black'>Сервисы и услуги Авето</h6>
				<div className='text-sm'>
					{SIDEBAR_SERVICES.map(service => (
						<div
							className='mt-3 flex items-start gap-2'
							key={service.title}
						>
							<Image
								src={service.icon}
								alt={service.title}
								width={30}
								height={30}
							/>
							<div>
								<p className='font-black'>{service.title}</p>
								<p className='text-gray mt-1'>{service.text}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<p className='text-gray mt-3 border-t pt-4 text-xs'>
				© ООО «TTX DEV» 2026 Авито использует рекомендательные
				технологии.
			</p>
		</div>
	)
}
