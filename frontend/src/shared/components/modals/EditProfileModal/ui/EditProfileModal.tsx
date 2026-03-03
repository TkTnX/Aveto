'use client'
import { X } from 'lucide-react'
import { useState } from 'react'

import { EditUserForm } from '@/src/features'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/src/shared/components/ui'

interface Props {
	children: React.ReactNode
}

export const EditProfileModal = ({ children }: Props) => {
	const [open, setOpen] = useState(false)
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent className='max-w-117.5!'>
				<div className='flex h-full flex-col justify-between overflow-y-auto'>
					<AlertDialogHeader>
						<AlertDialogTitle className='text-2xl font-bold'>
							Основные данные
						</AlertDialogTitle>
					</AlertDialogHeader>

					<EditUserForm />

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
