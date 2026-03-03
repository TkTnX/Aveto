import { useMutation, useQuery } from '@tanstack/react-query'

import { getMe, updateUser } from '@/src/api'
import { IUser } from '@/src/shared/types'

export function useUsers() {
	const getMeQuery = () =>
		useQuery({
			queryKey: ['get me'],
			queryFn: (): Promise<IUser> => getMe()
		})

	const updateMutation = () =>
		useMutation({
			mutationKey: ['update profile'],
			mutationFn: (values: FormData): Promise<IUser> => updateUser(values)
		})

	return { getMeQuery, updateMutation }
}
