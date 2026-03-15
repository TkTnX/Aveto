import { AxiosError } from 'axios'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
	Button,
	cn,
	ErrorMessage,
	Textarea,
	useAddReviewStore,
	useReviews
} from '@/src/shared'

export const AddReviewInfo = () => {
	const router = useRouter()
	const { writeReviewMutation } = useReviews()
	const { mutate, isPending } = writeReviewMutation()
	const [hoveredStar, setHoveredStar] = useState<null | number>(null)
	const { setRating, setText, setErrors, ...values } = useAddReviewStore()

	const onClick = () => {
		const { text, ad, howFinished, isBought, rating } = values
		if (text === '')
			return setErrors(['Текст должен быть от 5 до 2 000 символов'])
		if (!ad) return setErrors(['Укажите объявление!'])

		mutate(
			{
				adId: ad.id,
				howFinished: howFinished!,
				isBought: isBought!,
				rating: rating!,
				receiverId: ad.sellerId,
				text: text!
			},
			{
				onError: err => {
					if (err instanceof AxiosError) {
						setErrors([err?.response?.data.message])
					}
				},
				onSuccess: () => router.push(`/brand/${ad.sellerId}`)
			}
		)
	}
	return (
		<div className=''>
			<div className='vsm:flex-row mt-6 flex flex-col vsm:items-center gap-3 sm:gap-0'>
				<p className='font-black sm:mr-5.25 sm:w-48.25'>Оценка</p>
				<div className='flex items-center gap-1'>
					{[...new Array(5)].map((_, index) => (
						<button
							onClick={() => setRating(index + 1)}
							onMouseEnter={() => setHoveredStar(index)}
							onMouseLeave={() => setHoveredStar(null)}
							key={index}
						>
							<Star
								className={cn(
									'fill-[#e0e0e0] stroke-[#e0e0e0] transition',
									{
										'fill-[#ffb021] stroke-[#ffb021]':
											index <= (hoveredStar ?? -1)
									},
									{
										'fill-[#ffb021] stroke-[#ffb021]':
											values.rating &&
											index < values.rating
									}
								)}
								size={32}
							/>
						</button>
					))}
				</div>
			</div>
			<div className='vsm:flex-row mt-6 flex flex-col gap-3 sm:gap-0'>
				<p className='font-black sm:mr-5.25 sm:min-w-48.25'>
					Комментарий
				</p>
				<div className='w-full'>
					<Textarea
						disabled={isPending}
						className='min-h-35'
						value={values.text || ''}
						onChange={e => setText(e.target.value)}
						name='text'
						placeholder='В тексте не должно быть оскорблений, мата и чужих персональных данных, например фамилии, контактов и адреса'
					/>
					<p className='text-gray mt-2 text-xs'>
						От 5 до 2 000 символов
					</p>
				</div>
			</div>
			{values.errors.length > 0 &&
				values.errors.map(err => (
					<ErrorMessage
						className='my-2 text-right'
						key={err}
						error={Error(err)}
					/>
				))}
			<Button
				disabled={Object.values(values).includes(null) || isPending}
				onClick={onClick}
				className='bg-black disabled:pointer-events-none disabled:opacity-50'
			>
				Отправить
			</Button>
		</div>
	)
}
