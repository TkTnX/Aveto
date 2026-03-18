'use client'
import { X } from 'lucide-react'
import { useState } from 'react'

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/src/shared/components/ui'

interface Props {
	phone: string
	children: React.ReactNode
}

export const ShowPhoneModal = ({ phone, children }: Props) => {
	const [open, setOpen] = useState(false)
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<div className='flex h-full flex-col justify-between'>
					<AlertDialogHeader>
						<AlertDialogTitle className='text-2xl font-bold'>
							Номер телефона
						</AlertDialogTitle>
					</AlertDialogHeader>

					<p className='text-center text-5xl font-black'>{phone}</p>

					<button
						onClick={() => setOpen(false)}
						className='absolute -top-3 -right-20 text-white'
					>
						<X size={50} />
					</button>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	)
}
