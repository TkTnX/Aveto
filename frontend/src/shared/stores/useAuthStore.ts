import { create } from 'zustand'

interface AuthStoreType {
	openLogin: boolean
	openConfirm: null | 'reset' | 'confirm'
	openRegister: boolean
	isCodeSent: boolean
	email: string

	setOpenLogin: (bool: boolean) => void
	setOpenConfirm: (bool: null | 'reset' | 'confirm') => void
	setOpenRegister: (bool: boolean) => void
	setIsCodeSent: (bool: boolean) => void
	setEmail: (str: string) => void
}

export const useAuthStore = create<AuthStoreType>(set => ({
	openLogin: false,
	openConfirm: null,
	openRegister: false,
	isCodeSent: false,
	email: '',

	setOpenLogin: (bool: boolean) => set({ openLogin: bool }),
	setOpenConfirm: (state: null | 'reset' | 'confirm') =>
		set({ openConfirm: state }),
	setOpenRegister: (bool: boolean) => set({ openRegister: bool }),
	setIsCodeSent: (bool: boolean) => set({ isCodeSent: bool }),
	setEmail: (str: string) => set({ email: str })
}))
