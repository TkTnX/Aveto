import { Star } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/src/shared'

interface Props {
	className?: string
}

export const UserReviews = ({ className }: Props) => {
	return (
		<div className={cn('flex items-center gap-1', className)}>
			<p className='text-lg font-bold'>0,0</p>
			<div className='flex items-center gap-1'>
				{[...new Array(5)].map((_, index) => (
					<Star
						fill='#e0e0e0'
						key={index}
						stroke='#e0e0e0'
						size={16}
					/>
				))}
			</div>
			<Link href={'/profile/rating'} className='text-blue'>
				Нет отзывов
			</Link>
		</div>
	)
}
