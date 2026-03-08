'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

import { cn } from '@/src/shared'

interface Props {
	images: string[]
}

export const BigAdImages = ({ images }: Props) => {
	const [openImage, setOpenImage] = useState(false)
	const [currImage, setCurrImage] = useState(0)

	const onShowNext = () => {
		if (currImage === images.length - 1) {
			setCurrImage(0)
		} else {
			setCurrImage(currImage + 1)
		}
	}
	const onShowPrev = () => {
		if (currImage === 0) {
			setCurrImage(images.length - 1)
		} else {
			setCurrImage(currImage - 1)
		}
	}
	return (
		<div className='mt-7'>
			<Lightbox
				index={currImage}
				open={openImage}
				close={() => setOpenImage(false)}
				slides={images.map(img => ({ src: img }))}
			/>
			<div className='relative w-full'>
				<button
					onClick={() => setOpenImage(true)}
					className='h-80 md:h-114'
				>
					<Image
						src={images[currImage]}
						alt={images[currImage]}
						fill
						unoptimized
						className='object-cover'
					/>
				</button>
				<button
					onClick={onShowPrev}
					className='absolute top-0 bottom-0 left-0 flex h-full w-12.5 items-center justify-center hover:bg-black/30'
				>
					<ChevronLeft color='#fff' />
				</button>
				<button
					onClick={onShowNext}
					className='absolute top-0 right-0 bottom-0 flex h-full w-12.5 items-center justify-center hover:bg-black/30'
				>
					<ChevronRight color='#fff' />
				</button>
			</div>
			<div className='mt-5 grid grid-cols-7 items-center gap-1'>
				{images.map((image, index) => (
					<button
						className={cn('relative border-2 border-transparent', {
							'border-blue': currImage === index
						})}
						onClick={() => setCurrImage(index)}
						key={index}
					>
						<Image
							className='h-13.75 w-18.75 object-cover'
							src={image}
							alt={image}
							unoptimized
							width={75}
							height={55}
						/>
					</button>
				))}
			</div>
		</div>
	)
}
