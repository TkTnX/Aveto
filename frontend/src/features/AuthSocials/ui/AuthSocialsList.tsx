import Image from 'next/image'

export const AuthSocialsList = () => {
		return (
		<div className=''>
			<p>Или продолжить через</p>
			<div className='mt-3 flex items-center gap-3'>
				<a href={process.env.NEXT_PUBLIC_GOOGLE_AUTH}>
					<Image
						src={'/images/icons/google.svg'}
						width={44}
						height={44}
						alt='Google'
					/>
				</a>
			
				<a href={process.env.NEXT_PUBLIC_YANDEX_AUTH}>
					<Image
						src={'/images/icons/yandex.svg'}
						width={44}
						height={44}
						alt='Яндекс'
						className='rounded-full'
					/>
				</a>
			</div>
		</div>
	)
}
