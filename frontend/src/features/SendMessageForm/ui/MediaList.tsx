/* eslint-disable react-hooks/set-state-in-effect */
import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useChatStore } from '@/src/shared'

export const MediaList = () => {
	const [media, setMedia] = useState<{ type: string; url: string }[]>([])
	const { messageMedia } = useChatStore()
	useEffect(() => {
		const newMedia = messageMedia.map(file => ({
			url: URL.createObjectURL(file),
			type: file.type.startsWith('image/') ? 'image' : 'video'
		}))

		setMedia(newMedia)

		return () => {
			media.forEach(item => URL.revokeObjectURL(item.url))
		}
	}, [messageMedia])

	return (
		<div className='flex flex-wrap items-center gap-2'>
			{media.map((mediaItem, index) => (
				<div key={index} className='group relative'>
					<button
						onClick={() =>
							setMedia(
								media.filter(item => item.url !== mediaItem.url)
							)
						}
						className='absolute top-3 right-2 opacity-0 transition group-hover:opacity-100'
					>
						<X />
					</button>
					{mediaItem.type === 'image' ? (
						<Image
							src={mediaItem.url}
							width={200}
							height={200}
							className='h-50 w-50 rounded-2xl border object-cover'
							alt='Фото'
						/>
					) : (
						<video
							src={mediaItem.url}
							className='h-50 w-50 rounded-2xl border object-cover'
							controls
						/>
					)}
				</div>
			))}
		</div>
	)
}
