'use client'
import { CheckCircle2, Edit, Pencil } from 'lucide-react';
import Image from 'next/image';



import { EditProfileModal, Skeleton, UserBadge, useUserStore } from '@/src/shared';










export const UserInfo = () => {
	const { user } = useUserStore()

	if (!user) return <Skeleton className='mt-6 h-50 w-full' />
	return (
		<>
			<div className='relative mt-6 flex items-start gap-4 rounded-2xl bg-white p-5 shadow'>
				<div className='bg-accent relative flex h-18 w-18 items-center justify-center rounded-full text-4xl'>
					{user.avatar ? (
						<Image
							className='object-cover'
							src={user.avatar}
							fill
							alt='Аватарка не найдена!'
						/>
					) : (
						user.name[0]
					)}
				</div>
				<div>
					<h5 className='text-xl font-bold'>{user.name}</h5>
					<p>
						на Авето с{' '}
						{new Date(user.createdAt).toLocaleDateString('ru-RU')}
					</p>
					<p>ID {user.id}</p>
				</div>
				<EditProfileModal>
					<button className='absolute top-5 right-5'>
						<Pencil size={20} />
					</button>
				</EditProfileModal>
			</div>
			<div className='mt-12'>
				<h3 className='text-2xl font-bold'>Значки</h3>
				<p className='mt-1'>Видны всем в вашем профиле.</p>
				<div className='mt-2 flex items-center gap-2'>
					{user.isPhoneVerified && (
						<UserBadge confirmed='Телефон подтверждён' />
					)}
					{user.isEmailVerified && (
						<UserBadge confirmed='Почта подтверждена' />
					)}
				</div>
			</div>
		</>
	)
}
