import { create } from 'zustand'

interface AuthStoreType {
	openLogin: boolean
	openConfirm: boolean
	openRegister: boolean
	isCodeSent: boolean
	email: string

	setOpenLogin: (bool: boolean) => void
	setOpenConfirm: (bool: boolean) => void
	setOpenRegister: (bool: boolean) => void
	setIsCodeSent: (bool: boolean) => void
	setEmail: (str: string) => void
}

export const useAuthStore = create<AuthStoreType>(set => ({
	openLogin: false,
	openConfirm: false,
	isCodeSent: false,
	openRegister: false,
	email: '',

	setOpenLogin: (bool: boolean) => set({ openLogin: bool }),
	setOpenConfirm: (bool: boolean) => set({ openConfirm: bool }),
	setOpenRegister: (bool: boolean) => set({ openRegister: bool }),
	setIsCodeSent: (bool: boolean) => set({ isCodeSent: bool }),
	setEmail: (str: string) => set({ email: str })
}))
