import { Heart, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { IAd } from '@/src/shared/types'

interface Props {
	ad: IAd
}

export const Ad = ({ ad }: Props) => {
	return (
		<div className=''>
            <Link className='hover:text-red' href={`/p/${ad.slug}`}>
                {/* TODO: Сделать картинки как на avito */}
				<div className='relative h-58.75 w-full'>
					<Image
						fill
						src={ad.images[0]}
						alt={`${ad.title}-INDEX`}
						className='rounded-2xl'
					/>
				</div>
				<div className='mt-2 flex items-center justify-between'>
					<h6>{ad.title}</h6>
					<button>
						<Heart />
					</button>
				</div>
			</Link>
			<p className='font-bold'>{ad.price}₽</p>
			<div className='flex items-center gap-1 text-sm'>
				<MapPin size={14} />
				<p>{ad.address}</p>
			</div>
		</div>
	)
}
