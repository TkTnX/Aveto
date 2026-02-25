import Image from 'next/image'
import Link from 'next/link'

import { NAV_ITEMS, SOCIALS } from '@/src/shared'

export const Footer = () => {
	return (
		<footer className='mt-10 bg-[#f7f7f5] py-10'>
			<div className='container'>
				<nav>
					<ul className='flex items-center justify-between'>
						{NAV_ITEMS.map((item, index) => (
							<li key={index}>
								<Link
									className='hover:text-red transition'
									href={item.href}
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<p className='text-gray mt-3 max-w-135 text-xs'>
					Авето — сайт объявлений России. © ООО «TTX DEV» 2026.
					Правила Авето. Политика конфиденциальности. Оплачивая услуги
					на Авето, вы принимаете оферту. Авето использует
					рекомендательные технологии.
				</p>
				<div>
					<ul className='mt-3 flex items-center gap-2'>
						{SOCIALS.map(social => (
							<li key={social.label}>
								<a
									className='flex h-11 w-11 items-center justify-center rounded-full bg-[#1f1f1f]'
									href={social.href}
								>
									<Image
										src={social.icon}
										alt={social.label}
										width={24}
										height={24}
									/>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	)
}
