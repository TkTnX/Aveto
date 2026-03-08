/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { AxiosError } from 'axios'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cn, useAds, useAuthStore, useUserStore } from '@/src/shared'

interface Props {
	adId: string
	size?: number
	className?:string
}

export const AddAdToFavButton = ({ adId, className, size }: Props) => {
	const { user } = useUserStore()
	const [isLiked, setIsLiked] = useState(false)
	const { setOpenLogin } = useAuthStore()
	const { addAdToFavMutation } = useAds()
	const { mutate, isPending } = addAdToFavMutation()

	useEffect(() => {
		if (!user) return

		if (user.favorites.find(fav => fav.adId === adId)) {
			setIsLiked(true)
		}
	}, [user])

	const onClick = () =>
		mutate(adId, {
			onSuccess: data => {
				setIsLiked(data.isLiked)
			},
			onError: err => {
				if (
					err instanceof AxiosError &&
					err.response?.data.message.includes('Вы не авторизованы')
				) {
					setOpenLogin(true)
				}
			}
		})

	return (
		<button className={className} disabled={isPending} onClick={onClick}>
			<Heart
				className={cn(
					'transition disabled:pointer-events-none disabled:opacity-50',
					{ 'fill-red stroke-red': isLiked }
				)}
				size={size ?? 28}
				strokeWidth={3}
			/>
		</button>
	)
}
