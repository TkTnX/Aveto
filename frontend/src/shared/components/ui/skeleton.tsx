import { cn } from '@/src/shared/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='skeleton'
			className={cn('bg-gray/30 animate-pulse rounded-md', className)}
			{...props}
		/>
	)
}

export { Skeleton }
