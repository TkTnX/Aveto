import { X } from 'lucide-react'
import Link from 'next/link'

import { AuthSocialsList, LoginForm } from '@/src/features'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button
} from '@/src/shared/components/ui'

interface Props {
	children: React.ReactNode
}

export const LoginModal = ({ children }: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent className='h-screen max-h-153.75 p-0'>
				<div className='flex h-full flex-col justify-between overflow-y-auto'>
					<div className='px-10 py-9'>
						<AlertDialogHeader>
							<AlertDialogTitle className='text-2xl font-bold'>
								Вход
							</AlertDialogTitle>
						</AlertDialogHeader>

						<LoginForm />
					</div>

					<AlertDialogFooter className='flex-col! justify-start! rounded-b-2xl bg-[#f2efe9] px-9.5 pt-9 pb-11'>
						<AuthSocialsList />

						<div className='mt-3'>
							<p>Нет аккаунта на Авето?</p>
							<Button className='mt-3 bg-white text-sm text-black shadow-xl'>
								Зарегистрироваться
							</Button>
						</div>
						<p className='text-[#999]'>
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
					</AlertDialogFooter>
					<button className='absolute -top-3 -right-20 text-white'>
						<X size={50} />
					</button>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	)
}
