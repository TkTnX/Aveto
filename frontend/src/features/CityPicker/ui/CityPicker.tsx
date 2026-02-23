import { Send } from 'lucide-react'

export const CityPicker = () => {
	return (
		<button className=''>
			<span className='flex items-center gap-1'>
				<Send size={14} className='fill-black' />
				Екатеринбург,
			</span>
			<span className='text-gray'>район, метро</span>
		</button>
	)
}
