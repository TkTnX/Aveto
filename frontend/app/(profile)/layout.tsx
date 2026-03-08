import type { Metadata } from 'next'

import { ProfileSidebar } from '@/src/widgets'

export const metadata: Metadata = {
	description: 'Aveto: недвижимость, транспорт, работа, услуги, вещи'
}

export default function ProfileLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='container mt-10 flex flex-col items-start gap-15 sm:flex-row'>
			<ProfileSidebar />
			{children}
		</div>
	)
}
