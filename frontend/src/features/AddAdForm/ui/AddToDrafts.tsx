import { useRouter } from 'next/navigation'

import { Button } from '@/src/shared'
import { AddAdSchemaType } from '@/src/shared/schemas'

interface Props {
	values: AddAdSchemaType & {
		location: string
		condition: number | null
		category: string
	}
}

export const AddToDrafts = ({ values }: Props) => {
	const router = useRouter()
	const onClick = () => {
		localStorage.setItem('adDraft', JSON.stringify([values]))
		router.push('/')
	}

	return (
		<Button
			onClick={onClick}
			type='button'
			className='bg-accent text-black'
		>
			Сохранить и выйти
		</Button>
	)
}
