'use client'
import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Video from 'yet-another-react-lightbox/plugins/video'

import { getGridClass, IMG_EXP, VIDEO_EXP } from '@/src/shared'

interface Props {
	media: string[]
}

export const MessageMedia = ({ media }: Props) => {
	const [open, setOpen] = useState<null | number>(null)

	const isImage = (media: string) =>
		IMG_EXP.find(ext => media.toLowerCase().includes(ext))
	const isVideo = (media: string) =>
		VIDEO_EXP.find(ext => media.toLowerCase().includes(ext))

	return (
		<>
			<div
				className={`grid items-stretch gap-1 ${getGridClass(media.length)}`}
			>
				{media.map((media, index) => {
					if (isImage(media)) {
						return (
							<button
								onClick={() => setOpen(index)}
								key={index}
								className={`relative aspect-square min-h-25 w-full min-w-25 cursor-pointer ${media.length === 3 && index === 0 ? 'row-span-2' : ''} `}
							>
								<Image
									src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}${media}`}
									alt={media}
									unoptimized
									fill
									className='rounded-2xl object-cover'
								/>
							</button>
						)
					} else if (isVideo(media)) {
						return (
							<video
								className={`cursor-pointer rounded-2xl ${media.length === 3 && index === 0 ? 'row-span-2' : ''} `}
								controls
								key={index}
								src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}${media}`}
							></video>
						)
					}
				})}
			</div>
			<Lightbox
				index={open!}
				plugins={[Video]}
				open={!!open}
				close={() => setOpen(null)}
				slides={media.map(item => {
					const src = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}${item}`
					if (isImage(item)) {
						return {
							type: 'image',
							src
						}
					}

					if (isVideo(item)) {
						return {
							type: 'video',
							sources: [
								{
									src,
									type: 'video'
								}
							]
						}
					}

					return {
						type: 'image',
						src
					}
				})}
			/>
		</>
	)
}
