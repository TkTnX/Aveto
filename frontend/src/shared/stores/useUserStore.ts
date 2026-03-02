import { create } from 'zustand'

import { IUser } from '@/src/shared/types'

interface UserStoreProps {
	user: null | IUser
	setUser: (user: IUser) => void
}

export const useUserStore = create<UserStoreProps>(set => ({
		user: null,
		setUser: (user: IUser) => set({ user })
	}))
