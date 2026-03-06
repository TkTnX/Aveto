/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useState } from 'react'

import { useAddItemStore } from '@/src/shared'
import { AddAdSchemaType } from '@/src/shared/schemas'

export interface DraftType extends AddAdSchemaType {
	category: string
}

export const AdDrafts = () => {
	const { setCategory, setDraft, category } = useAddItemStore()
	const [drafts, setDrafts] = useState<DraftType[]>([])
	useEffect(() => {
		const drafts = localStorage.getItem('adDraft')

		if (drafts) {
			setDrafts(JSON.parse(drafts))
		}
	}, [])

	if (!drafts || category) return

	const onClick = (draft: DraftType) => {
		setCategory(draft.category)
		setDraft(draft)
	}

	return (
		<div className='mt-8'>
			<h3 className='text-2xl font-black'>Черновик</h3>

			<div className='mt-4 flex flex-wrap items-center gap-3'>
				{drafts.map((draft, index) => (
					<button
						onClick={() => onClick(draft)}
						className='bg-accent rounded-xl p-4 hover:brightness-90'
						key={index}
					>
						<p>{draft?.title || `#${index + 1}`}</p>
						<p>{draft?.price || 'Цена не указана'}</p>
					</button>
				))}
			</div>
		</div>
	)
}
