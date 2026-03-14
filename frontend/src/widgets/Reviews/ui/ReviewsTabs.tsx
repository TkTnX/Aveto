'use client'

import { useState } from 'react'

import { cn } from '@/src/shared'

import { WaitingForReview } from './WaitingForReview'
import { WrittenReviewsList } from './WrittenReviewsList'

export const ReviewsTabs = () => {
	const [activeTab, setActiveTab] = useState(0)
	return (
		<div className='w-full'>
			<div className='flex w-full items-center border-b-2'>
				<button
					className={cn(
						'text-gray border-b-2 border-transparent pt-3 pr-4 pb-2 text-xl font-black',
						{ 'border-b-black text-black': activeTab === 0 }
					)}
					onClick={() => setActiveTab(0)}
				>
					Ждут оценки
				</button>
				<button
					className={cn(
						'text-gray border-b-2 border-transparent px-4 pt-3 pb-2 text-xl font-black',
						{ 'border-b-black text-black': activeTab === 1 }
					)}
					onClick={() => setActiveTab(1)}
				>
					Оставленные
				</button>
			</div>
			{activeTab === 0 ? <WaitingForReview /> : <WrittenReviewsList />}
		</div>
	)
}
