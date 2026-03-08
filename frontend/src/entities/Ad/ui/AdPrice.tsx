import { cn } from '@/src/shared'

interface Props {
	price: number
	discount?: number
	size?: 'lg' | 'sm'
}

export const AdPrice = ({ price, size = 'lg', discount }: Props) => {
	return (
		<>
			{discount ? (
				<div>
					<h3
						className={cn('text-3xl font-black', {
							'text-base': size === 'sm'
						})}
					>
						{price - (price / 100) * parseFloat(`${discount}%`)} ₽
					</h3>
					<p
						className={cn('text-xl font-black line-through', {
							'text-xs': size === 'sm'
						})}
					>
						{price} ₽
					</p>
				</div>
			) : (
				<h3
					className={cn('text-3xl font-black', {
						'text-base': size === 'sm'
					})}
				>
					{price} ₽
				</h3>
			)}
		</>
	)
}
