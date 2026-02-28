import Image from 'next/image'

export const AuthSocialsList = () => {
	return (
		<div className=''>
			<p>Или продолжить через</p>
			<div className='mt-3 flex items-center gap-3'>
				<button>
					<Image
						src={'/images/icons/google.svg'}
						width={44}
						height={44}
						alt='Google'
					/>
				</button>
				<button>
					<Image
						src={'/images/icons/vkFilled.svg'}
						width={44}
						height={44}
						alt='VK'
					/>
				</button>
				<button>
					<Image
						src={'/images/icons/yandex.svg'}
						width={44}
						height={44}
						alt='VK'
						className='rounded-full'
					/>
				</button>
			</div>
		</div>
	)
}
