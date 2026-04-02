'use client'
import { useEffect } from 'react'

import {
	Label,
	RadioGroup,
	RadioGroupItem,
	REVIEW_FINISHED,
	useAddReviewStore
} from '@/src/shared'
import { IAd } from '@/src/shared/types'

import { AddReviewInfo } from './AddReviewInfo'
import { SellerAds } from './SellerAds'

interface Props {
	ads: IAd[]
	adId?: string
}

export const AddReview = ({ ads, adId }: Props) => {
	const { setIsBought, setHowFinished, ad, isBought, howFinished, setAd } =
		useAddReviewStore()

	useEffect(() => {
		const findAd = ads.find(ad => ad.id === adId)
		if (findAd) {
			setAd(findAd)
		}
	}, [adId])

	return (
		<div className='container mt-9 max-w-158!'>
			<h1 className='text-3xl font-black'>Отзывы о пользователе</h1>
			<SellerAds ads={ads} />
			{ad && (
				<div className='vsm:flex-row mt-6 flex flex-col gap-6 sm:mr-5.25'>
					<p className='font-black sm:w-48.75'>Вы купили товар?</p>
					<RadioGroup onValueChange={setIsBought}>
						<div className='flex items-center gap-3'>
							<RadioGroupItem value='Да' id='Да' />
							<Label htmlFor='Да'>Да</Label>
						</div>
						<div className='flex items-center gap-3'>
							<RadioGroupItem value='Нет' id='Нет' />
							<Label htmlFor='Нет'>Нет</Label>
						</div>
					</RadioGroup>
				</div>
			)}
			{isBought && (
				<div className='vsm:flex-row mt-6 flex flex-col gap-6 sm:mr-5.25'>
					<p className='font-black sm:w-48.75'>
						Чем всё закончилось?
					</p>
					<RadioGroup onValueChange={setHowFinished}>
						{REVIEW_FINISHED.map(str => (
							<div key={str} className='flex items-center gap-3'>
								<RadioGroupItem value={str} id={str} />
								<Label htmlFor={str}>{str}</Label>
							</div>
						))}
					</RadioGroup>
				</div>
			)}
			{howFinished && <AddReviewInfo />}
		</div>
	)
}
