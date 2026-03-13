import { Dot, SendHorizonal } from 'lucide-react'
import Link from 'next/link'

import { AdPrice } from '@/src/entities'
import { AddAdToFavButton } from '@/src/features'
import { Button, UserAvatar } from '@/src/shared'
import { IAd } from '@/src/shared/types'
import { UserReviews } from '@/src/widgets/UserReviews'

interface Props {
	ad: IAd
}
export const AdSidebar = ({ ad }: Props) => {
	return (
		<div className='sticky top-5 w-full md:w-75 lg:w-80.5'>
			<div className='flex items-start justify-between'>
				<AdPrice price={ad.price} discount={ad.discount} />
				<AddAdToFavButton adId={ad.id} />
			</div>
			{ad.quantity > 0 && (
				<p className='text-green mt-1 flex items-center text-xl font-bold'>
					<Dot /> Несколько в наличии
				</p>
			)}
			<div className='mt-4 flex flex-col gap-2.5'>
				<Button className='h-17 justify-center bg-[#02d15c] text-lg font-bold text-white'>
					Показать телефон
				</Button>
				<Button className='bg-blue h-17 justify-center text-lg font-bold text-white'>
					Написать сообщение
				</Button>
			</div>

			{ad.seller && (
				<div className='mt-6 flex items-start justify-between gap-2 md:flex-col-reverse lg:mt-12.5 lg:flex-row'>
					<div>
						<Link
							className='text-blue text-sm tracking-wider'
							href={`/brands/${ad.seller.id}`}
						>
							{ad.seller.name}
						</Link>
						<UserReviews
							userId={ad.seller.id}
							rating={ad.seller.rating}
						/>
						<p>
							На Авето с{' '}
							{new Date(ad.seller.createdAt).getFullYear()}
						</p>
					</div>
					<Link
						href={`/brand/${ad.seller.id}`}
						className='relative block h-10 w-10'
					>
						<UserAvatar
							name={ad.seller.name}
							avatar={ad.seller.avatar}
						/>
					</Link>
				</div>
			)}

			<div className='mt-12.5'>
				<h3 className='text-xl font-black'>Спросите у продавца</h3>
				<div className='relative mt-3 w-full'>
					<textarea className='h-21 w-full resize-none rounded-lg bg-[#f2f1f0] py-1 pr-10 pl-2' />
					<button className='absolute top-2 right-2'>
						<SendHorizonal className='stroke-gray/90' />
					</button>
				</div>
			</div>
		</div>
	)
}
