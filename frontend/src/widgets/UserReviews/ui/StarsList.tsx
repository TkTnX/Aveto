import { Star } from 'lucide-react'

interface Props {
	rating: number
}

export const StarsList = ({ rating }: Props) => {
	return (
		<div className='flex items-center gap-1'>
			{[...new Array(rating)].map((_, index) => (
				<Star fill='#ffb021' key={index} stroke='#ffb021' size={16} />
			))}
			{[...new Array(5 - rating)].map((_, index) => (
				<Star fill='#e0e0e0' key={index} stroke='#e0e0e0' size={16} />
			))}
		</div>
	)
}
