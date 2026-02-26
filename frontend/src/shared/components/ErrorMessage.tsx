interface Props {
	error: Error
}

export const ErrorMessage = ({ error }: Props) => {
	console.log(error)
	return <p className='text-red my-10 text-center'>{error.message}</p>
}
