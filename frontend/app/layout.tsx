import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

import { Header } from '@/src/widgets'

import './globals.css'

const fontFamily = Manrope({
	variable: '--font-family'
})

export const metadata: Metadata = {
	title: 'Aveto: недвижимость, транспорт, работа, услуги, вещи',
	description: 'Aveto: недвижимость, транспорт, работа, услуги, вещи'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html suppressHydrationWarning={true} lang='ru'>
			<body className={`${fontFamily.variable} antialiased`}>
				<Header />
				{children}
			</body>
		</html>
	)
}
