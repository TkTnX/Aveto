import { Metadata } from 'next'

import { UserAdsList } from '@/src/widgets'

export const metadata: Metadata = {
	title: 'Личный кабинет - Мои объявления'
}

const ProfilePage = () => {
	return <UserAdsList />
}

export default ProfilePage
