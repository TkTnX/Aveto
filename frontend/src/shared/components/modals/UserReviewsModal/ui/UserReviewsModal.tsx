'use client'
import { Star, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Review } from '@/src/entities'
import { ErrorMessage } from '@/src/shared/components/ErrorMessage'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Skeleton
} from '@/src/shared/components/ui'
import { useReviews } from '@/src/shared/hooks'
import { IUser } from '@/src/shared/types'

interface Props {
	user: IUser
	children: React.ReactNode
}

export const UserReviewsModal = ({ user, children }: Props) => {
	const [open, setOpen] = useState(false)
	const { userReviewsQuery } = useReviews()
	const { data, isPending, error } = userReviewsQuery(user.id)

	const ratings = [0, 0, 0, 0, 0]

	data?.forEach(item => {
		ratings[item.rating - 1] += 1
	})
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogCancel className='absolute top-3 right-3'>
					<X color='#000' />
				</AlertDialogCancel>
				<div className='flex h-full flex-col justify-between overflow-y-auto'>
					<AlertDialogHeader>
						<AlertDialogTitle className='text-2xl font-bold'>
							Отзывы о пользователе
						</AlertDialogTitle>
					</AlertDialogHeader>

					{error ? (
						<ErrorMessage error={error} />
					) : isPending ? (
						<Skeleton className='h-50 w-full' />
					) : (
						<div className='w-full'>
							<div className='flex items-stretch justify-between gap-2'>
								<div className='w-fit'>
									<h3 className='text-6xl font-black'>
										{user.rating.toFixed(1)}
									</h3>
									<div className='flex items-center gap-1'>
										{[...new Array(user.rating)].map(
											(_, index) => (
												<Star
													fill='#ffb021'
													key={index}
													stroke='#ffb021'
													size={16}
												/>
											)
										)}
										{[...new Array(5 - user.rating)].map(
											(_, index) => (
												<Star
													fill='#e0e0e0'
													key={index}
													stroke='#e0e0e0'
													size={16}
												/>
											)
										)}
									</div>
									<p className='text-center'>
										{data.length} отзыва
									</p>
								</div>
								<div>
									{ratings.map((rating, index) => (
										<div
											className='flex items-center'
											key={index}
										>
											{[...new Array(index + 1)].map(
												(_, index) => (
													<Star
														fill='#ffb021'
														key={index}
														stroke='#ffb021'
														size={16}
													/>
												)
											)}
											{[...new Array(5 - index - 1)].map(
												(_, index) => (
													<Star
														fill='#e0e0e0'
														key={index}
														stroke='#e0e0e0'
														size={16}
													/>
												)
											)}
											<p className='ml-4'>{rating}</p>
										</div>
									))}
								</div>
								<div className='text-center'>
									<p>
										Рейтинг — это среднее арифметическое
										оценок пользователей.
									</p>
									<Button className='mt-2 w-full justify-center bg-black p-0'>
										<Link
											href={'#!'}
											className='px-4 py-2 hover:text-white!'
										>
											Написать отзыв
										</Link>
									</Button>
								</div>
							</div>
							<div className='mt-4 flex max-h-100 flex-col gap-2 overflow-y-auto'>
								{data.map(review => (
									<Review review={review} key={review.id} />
								))}
							</div>
						</div>
					)}
				</div>
			</AlertDialogContent>
		</AlertDialog>
	)
}
