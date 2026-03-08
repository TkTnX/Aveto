import { Dot } from 'lucide-react'

import { IAd } from '@/src/shared/types'

import { BigAdCharacteristics } from './BigAdCharacteristics'
import { BigAdImages } from './BigAdImages'
import { BigAdLocation } from './BigAdLocation'

interface Props {
	ad: IAd
}

export const BigAd = ({ ad }: Props) => {
	return (
		<div className='w-full md:max-w-150'>
			<h1 className='text-3xl font-black'>{ad.title}</h1>
			<BigAdImages images={ad.images} />
			<BigAdLocation address={ad.address} />
			<BigAdCharacteristics characteristics={ad.characteristics} />
			<div className='mt-12'>
				<h3 className='text-2xl font-black'>Описание</h3>
				<p className='mt-4'>{ad.description}</p>
			</div>

			<p className='mt-12 flex items-center'>
				№{ad.id.split('-')[0]} <Dot />{' '}
				{new Date(ad.createdAt).toLocaleDateString('ru-RU')} <Dot />{' '}
				{ad.views} просмотра
			</p>
		</div>
	)
}
