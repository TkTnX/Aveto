import { Metadata } from 'next'

import { Chats } from '@/src/widgets'

export const metadata: Metadata = {
	title: 'Сообщения | Авето'
}

const MessengerPage = () => {
	return (
		<div className='flex-1'>
			<h1 className='text-3xl font-black'>Сообщения</h1>
			<Chats />
		</div>
	)
}

export default MessengerPage
