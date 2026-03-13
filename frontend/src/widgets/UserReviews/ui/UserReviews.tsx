'use client'
import { Star } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/src/shared'

interface Props {
	className?: string
	rating: number
	userId: string
}

export const UserReviews = ({ className, rating, userId }: Props) => {
	return (
		<div className={cn('flex items-center gap-1', className)}>
			<p className='text-lg font-bold'>{rating.toFixed(1)}</p>
			<div className='flex items-center gap-1'>
				{[...new Array(rating)].map((_, index) => (
					<Star
						fill='#ffb021'
						key={index}
						stroke='#ffb021'
						size={16}
					/>
				))}
				{[...new Array(5 - rating)].map((_, index) => (
					<Star
						fill='#e0e0e0'
						key={index}
						stroke='#e0e0e0'
						size={16}
					/>
				))}
			</div>
			<Link href={`/brand/${userId}`} className='text-blue'>
				{rating === 0 ? 'Нет отзывов' : `Все отзывы`}
			</Link>
		</div>
	)
}
