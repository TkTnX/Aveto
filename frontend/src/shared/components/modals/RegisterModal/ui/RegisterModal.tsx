import { X } from 'lucide-react'
import Link from 'next/link'

import { RegisterForm } from '@/src/features'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/src/shared/components/ui'
import { useAuthStore } from '@/src/shared/stores'

export const RegisterModal = () => {
	const { openRegister, setOpenRegister } = useAuthStore()
	return (
		<AlertDialog open={openRegister} onOpenChange={setOpenRegister}>
			<AlertDialogContent>
				<div className='flex h-full flex-col justify-between overflow-y-auto'>
					<AlertDialogHeader>
						<AlertDialogTitle className='text-2xl font-bold'>
							Придумайте имя и пароль
						</AlertDialogTitle>
					</AlertDialogHeader>

					<RegisterForm />

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
						onClick={() => setOpenRegister(false)}
						className='absolute -top-3 -right-20 text-white'
					>
						<X size={50} />
					</button>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	)
}
