'use client'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { EnterCodeForm, EnterEmailForm } from '@/src/features'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/src/shared/components/ui'

interface Props {
	open: boolean
	onOpenChange: (bool: boolean) => void
}

export const ConfirmEmailModal = ({ open, onOpenChange }: Props) => {
	const [isCodeSent, setIsCodeSent] = useState(false)
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<div className='flex h-full flex-col justify-between overflow-y-auto'>
					<AlertDialogHeader>
						<AlertDialogTitle className='text-2xl font-bold'>
							{!isCodeSent ? 'Введите почту' : 'Подтвердите код'}
						</AlertDialogTitle>
					</AlertDialogHeader>

					{!isCodeSent ? (
						<EnterEmailForm setIsCodeSent={setIsCodeSent} />
					) : (
						<EnterCodeForm />
					)}
					<p className='mt-5 text-[#999]'>
						Регистрируясь, вы принимаете{' '}
						<Link
							className='underline hover:text-[#999]! hover:opacity-80'
							href={'#!'}
						>
							Условия использования
						</Link>{' '}
						Авито.{' '}
						<Link
							className='underline hover:text-[#999]! hover:opacity-80'
							href={'#!'}
						>
							Политика конфиденциальности
						</Link>
						.
					</p>
					<button
						onClick={() => onOpenChange(false)}
						className='absolute -top-3 -right-20 text-white'
					>
						<X size={50} />
					</button>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	)
}
