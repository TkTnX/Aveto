'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { TooltipProvider } from '@/src/shared/components/ui'

interface Props {
	children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>{children}</TooltipProvider>
		</QueryClientProvider>
	)
}
