import Image from 'next/image'

interface Props {
	avatar?: string
	name: string
}

export const UserAvatar = ({ avatar, name }: Props) => {
	return (
		<>
			{avatar ? (
				<Image
					className='rounded-full object-cover'
					src={avatar}
					fill
					alt='Аватарка!'
					unoptimized
				/>
			) : (
				name[0]
			)}
		</>
	)
}
