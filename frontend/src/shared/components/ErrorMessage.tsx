import { cn } from "@/src/shared/lib";







interface Props {
	error: Error
	className?:string
}

export const ErrorMessage = ({ error, className }: Props) => {
	console.log(error)
	return <p className={cn('text-red my-10 text-center', className)}>{error.message}</p>
}
