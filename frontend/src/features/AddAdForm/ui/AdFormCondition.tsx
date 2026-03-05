import { Button, cn, Label, Tooltip, TooltipContent, TooltipTrigger } from "@/src/shared"
import { EAdCondition } from "@/src/shared/types"
import { CircleQuestionMarkIcon } from "lucide-react"

interface Props {
    condition: EAdCondition | null,
    setCondition: (condition: EAdCondition) => void
}

export const AdFormCondition = ({condition, setCondition}: Props) => {
  return (
		<div className='mt-10'>
			<Label className='font-bold'>Состояние</Label>
			<div className='mt-3 flex items-center gap-1.5'>
				<Button
					onClick={() => setCondition(EAdCondition.NEW)}
					className={cn('bg-[#ebeae8] text-black', {
						'bg-black text-white': condition === EAdCondition.NEW
					})}
				>
					Новое
				</Button>
				<Button
					onClick={() => setCondition(EAdCondition.USED)}
					className={cn('bg-[#ebeae8] text-black', {
						'bg-black text-white': condition === EAdCondition.USED
					})}
				>
					Б/у
				</Button>
			</div>

			<p className='mt-3 flex gap-1'>
				Какую вещь можно считать новой{' '}
				<Tooltip>
					<TooltipTrigger className='flex items-center'>
						<CircleQuestionMarkIcon
							size={16}
							className='fill-[#b9b9b9] stroke-white'
						/>
					</TooltipTrigger>
					<TooltipContent className='max-w-100 text-lg text-black'>
						Если вы не пользовались вещью, у вас сохранилась
						упаковка и бирки, можете указать, что продаёте новый
						товар. Предмет, которым пользовались хотя бы раз, уже
						нельзя назвать новым.
					</TooltipContent>
				</Tooltip>
			</p>
		</div>
  )
}
