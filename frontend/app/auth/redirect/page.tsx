'use client'
import Cookies from 'js-cookie';
import { Metadata } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react'

export const metadata: Metadata = {
	robots: {
		index: false
	}
}

const RedirectPage = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const router = useRouter()
	useEffect(() => {
		if (!token) return
		Cookies.set('accessToken', token)
		router.push('/profile')
	}, [router, token])

	return (
		<div className='text-blue my-10 text-center text-3xl font-black'>
			Подождите...
		</div>
	)
}

export default RedirectPage
