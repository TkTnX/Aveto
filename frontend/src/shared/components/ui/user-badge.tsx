import { CheckCircle2 } from "lucide-react"

interface Props {
    confirmed: string
}

export const UserBadge = ({confirmed}: Props) => {
  return (
		<div className='flex w-fit items-center gap-1 rounded-lg bg-[#e6f6ff] p-3'>
			<CheckCircle2 size={16} /> {confirmed}
		</div>
  )
}
