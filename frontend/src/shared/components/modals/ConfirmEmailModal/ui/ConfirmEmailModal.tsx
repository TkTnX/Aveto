'use client'
import { X } from 'lucide-react'
import Link from 'next/link'

import { EnterCodeForm, EnterEmailForm } from '@/src/features'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/src/shared/components/ui'
import { useAuthStore } from '@/src/shared/stores'

export const ConfirmEmailModal = () => {
	const { openConfirm, setOpenConfirm, isCodeSent } = useAuthStore()
	console.log(openConfirm)
	return (
		<AlertDialog
			open={openConfirm !== null}
			onOpenChange={() => setOpenConfirm(null)}
		>
			<AlertDialogContent>
				<div className='flex h-full flex-col justify-between overflow-y-auto'>
					<AlertDialogHeader>
						<AlertDialogTitle className='text-2xl font-bold'>
							{!isCodeSent || openConfirm === 'reset'
								? 'Введите почту'
								: 'Подтвердите код'}
						</AlertDialogTitle>
					</AlertDialogHeader>

					{!isCodeSent || openConfirm === 'reset' ? (
						<EnterEmailForm />
					) : (
						<EnterCodeForm />
					)}
					{openConfirm === 'confirm' && (
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
					)}
					<button
						onClick={() => setOpenConfirm(null)}
						className='absolute -top-3 -right-20 text-white'
					>
						<X size={50} />
					</button>
				</div>
				{isCodeSent && (
					<p className='text-green mt-3'>
						Письмо отправлено на почту!
					</p>
				)}
			</AlertDialogContent>
		</AlertDialog>
	)
}
