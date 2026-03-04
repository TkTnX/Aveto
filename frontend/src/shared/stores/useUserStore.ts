import { create } from 'zustand'

import { IUser } from '@/src/shared/types'

interface UserStoreProps {
	user: null | IUser
	setUser: (user: IUser | null) => void
}

export const useUserStore = create<UserStoreProps>(set => ({
		user: null,
		setUser: (user) => set({ user })
	}))
