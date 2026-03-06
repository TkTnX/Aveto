import { CircleQuestionMarkIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { useDebounce } from 'use-debounce'

import { getAddresses } from '@/src/api'
import {
	Field,
	Input,
	Label,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/src/shared'
import { IAddresses } from '@/src/shared/types'

interface Props {
	location: string
	setLocation: (location: string) => void
}

export const LocationMap = ({ location, setLocation }: Props) => {
	const [addresses, setAddresses] = useState<IAddresses[]>([])
	const [value] = useDebounce(location, 1500)

	const [coordinates, setCoordinates] = useState<null | {
		lat: string
		lon: string
	}>(null)

	const onClickCoordinates = (lat: string, lon: string) => {
		setCoordinates({ lon, lat })
	}

	useEffect(() => {
		async function fetchData() {
			const data = await getAddresses(value)
			setAddresses(data.suggestions)
		}
		fetchData()
	}, [value])

	return (
		<div className='mt-10'>
			<div>
				<Field className='relative gap-0'>
					<Label className='font-bold'>Местоположение</Label>
					<Input
						// disabled={isPending}
						className='mt-2 h-13 focus-visible:bg-white focus-visible:ring-[#80d4ff]'
						onChange={e => setLocation(e.target.value)}
						placeholder='Начните вводить адрес'
					/>

					<p className='text-gray mt-3 flex gap-1'>
						Укажите реальный адрес, где покупатель может купить или
						получить товар{' '}
						<Tooltip>
							<TooltipTrigger className='flex items-center'>
								<CircleQuestionMarkIcon
									size={16}
									className='fill-[#b9b9b9] stroke-white'
								/>
							</TooltipTrigger>
							<TooltipContent className='max-w-100 text-black'>
								<h3 className='text-2xl font-bold'>
									Почему лучше указывать реальный адрес?
								</h3>
								<p className='mt-3'>
									Покупателям будет проще сделать выбор и они
									смогут найти ваше объявление при поиске по
									радиусу, району или метро. Это не помешает
									вашему предложению появиться в результатах
									поиска по городу, региону или всей России.
								</p>
							</TooltipContent>
						</Tooltip>
					</p>
					<div className='absolute top-20 z-10 flex max-h-100 flex-col items-start overflow-y-auto rounded-xl bg-white'>
						{location.length > 0 &&
							addresses.map(address => (
								<button
									onClick={() => {
										onClickCoordinates(
											address.data.geo_lat,
											address.data.geo_lon
										)
										setLocation(address.value)
									}}
									type='button'
									className='hover:bg-gray-2 w-full rounded-xl px-4.5 py-4 text-left'
									key={address.value}
								>
									{address.value}
								</button>
							))}
					</div>
				</Field>
			</div>
			<div className='mt-3 w-full'>
				<iframe
					key={`${coordinates?.lat}-${coordinates?.lon}`}
					src={`https://yandex.ru/map-widget/v1/?ll=${coordinates?.lon}%2C${coordinates?.lat}&z=12&pt=${coordinates?.lon},${coordinates?.lat},pm2rdm&z=12`}
					className='w-full'
					height='400'
					allowFullScreen={true}
					style={{ position: 'relative' }}
				></iframe>
			</div>
		</div>
	)
}
