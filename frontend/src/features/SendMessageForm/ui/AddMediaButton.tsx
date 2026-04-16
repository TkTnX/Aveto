import { Camera } from 'lucide-react'

import { useChatStore } from '@/src/shared'

export const AddMediaButton = () => {
	const { setMessageMedia } = useChatStore()
	return (
		<label className='hover:bg-gray/20 flex h-11 min-h-11 w-11 min-w-11 cursor-pointer items-center justify-center rounded-full'>
			<input
				onChange={e => {
					if (e.target.files) {
						setMessageMedia(e.target.files)
					}
				}}
				type='file'
				hidden
				accept='image/*, video/*'
				multiple
			/>
			<Camera size={24} />
		</label>
	)
}
