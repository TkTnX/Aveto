'use client'

import { Dot } from 'lucide-react'

import { IAd } from '@/src/shared/types'

import { BigAdImages } from './BigAdImages'

interface Props {
	ad: IAd
}

// TODO: Продолжать доделывать bigAd

export const BigAd = ({ ad }: Props) => {
	return (
		<div className='w-full md:max-w-150'>
			<h1 className='text-3xl font-black'>{ad.title}</h1>
			<BigAdImages images={ad.images} />
			<div className='mt-12'>
				<h3 className='text-2xl font-black'>Местоположение</h3>
				<p className='mt-4'>{ad.address}</p>
				{/* // TODO: Отображать карту */}
				<button className='text-blue hover:text-red mt-2'>
					Узнать подробности
				</button>
			</div>
			<div className='mt-12'>
				<h3 className='text-2xl font-black'>Характеристики</h3>
				<div className='mt-4 grid grid-cols-2 gap-y-4'>
					{ad.characteristics.length > 0 ? (
						ad.characteristics.map(char => (
							<div
								className='flex items-center gap-1'
								key={char.id}
							>
								<p className='text-gray'>{char.name}:</p>{' '}
								<p>{char.value}</p>
							</div>
						))
					) : (
						<p>Характеристики не указаны</p>
					)}
				</div>
				{/* // TODO: Отображать все характеристики */}
				{ad.characteristics.length > 0 && (
					<button className='text-blue hover:text-red mt-2'>
						Все характеристики
					</button>
				)}
			</div>
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
