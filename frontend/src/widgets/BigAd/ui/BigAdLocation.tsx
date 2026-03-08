'use client'
import { useEffect, useState } from 'react'

import { getAddresses } from '@/src/api'
import { IAddresses } from '@/src/shared/types'

interface Props {
	address: string
}

export const BigAdLocation = ({ address }: Props) => {
	const [openMap, setOpenMap] = useState(false)
	const [coordinates, setCoordinates] = useState<IAddresses | null>(null)

	useEffect(() => {
		if (!openMap) return

		async function fetchData() {
			const data = await getAddresses(address)
			setCoordinates(data.suggestions[0])
		}

		fetchData()
	}, [address, openMap])
	return (
		<div className='mt-12'>
			<h3 className='text-2xl font-black'>Местоположение</h3>
			<p className='mt-4'>{address}</p>
			{!openMap && (
				<button
					onClick={() => setOpenMap(true)}
					className='text-blue hover:text-red mt-2'
				>
					Узнать подробности
				</button>
			)}
			{openMap && (
				<div className='mt-3 w-full'>
					<iframe
						key={`${coordinates?.data.geo_lat}-${coordinates?.data.geo_lon}`}
						src={`https://yandex.ru/map-widget/v1/?ll=${coordinates?.data.geo_lon}%2C${coordinates?.data.geo_lat}&z=12&pt=${coordinates?.data.geo_lon},${coordinates?.data.geo_lat},pm2rdm&z=12`}
						className='w-full'
						height='400'
						allowFullScreen={true}
						style={{ position: 'relative' }}
					></iframe>
				</div>
			)}
		</div>
	)
}
