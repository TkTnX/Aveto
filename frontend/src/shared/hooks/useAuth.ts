import { useMutation } from '@tanstack/react-query'

import { login } from '@/src/api'
import { LoginSchemaType } from '@/src/shared/schemas'

export function useAuth() {
	const loginMutation = () =>
		useMutation({
			mutationKey: ['login'],
			mutationFn: (values: LoginSchemaType) => login(values)
        })
    return {loginMutation}
}
