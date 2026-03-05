'use client'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { useAuth, useUserStore } from '@/src/shared'

export const LogoutButton = () => {
	const { setUser } = useUserStore()
	const router = useRouter()
	const queryClient = useQueryClient()
	const { logoutMutation } = useAuth()
	const { mutate } = logoutMutation({
		onSuccess: () => {
			Cookies.remove('accessToken')
			queryClient.setQueryData(['get me'], null)
			queryClient.removeQueries({ queryKey: ['get me'] })
			router.push('/')
			setUser(null)
		}
	})

	return (
		<button
			className='text-gray hover:text-red mt-4 w-full border-t px-4 pt-2 text-left'
			onClick={mutate}
		>
			Выйти
		</button>
	)
}
