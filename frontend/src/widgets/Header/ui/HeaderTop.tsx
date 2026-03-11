'use client'
import { ChevronDown, Heart, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/shared'

import { UserButton } from './UserButton'

export const HeaderTop = () => {
	return (
		<div className='flex h-13.5 items-center justify-between justify-self-end lg:justify-self-auto'>
			<nav className='hidden lg:block'>
				<ul className='text-gray flex items-center gap-4'>
					<Tooltip>
						<TooltipTrigger>
							<li className='hover:text-red flex cursor-pointer items-center gap-1 transition'>
								Для бизнеса
								<ChevronDown size={14} />
							</li>
						</TooltipTrigger>
						<TooltipContent className='flex flex-col px-0 text-black'>
							<Link
								className='hover:bg-gray-light/30 px-4 py-3 hover:text-black!'
								href={'/c/avto'}
							>
								Продавать
							</Link>
							<Link
								className='hover:bg-gray-light/30 px-4 py-3 hover:text-black!'
								href={`/c/novostroyki`}
							>
								Покупать
							</Link>
							<Link
								className='hover:bg-gray-light/30 px-4 py-3 hover:text-black!'
								href={`/c/novostroyki`}
							>
								Нанимать
							</Link>
						</TooltipContent>
					</Tooltip>
					<li className='flex cursor-pointer items-center gap-1 transition'>
						<Link href={'/career'}>Карьера в Авето</Link>
					</li>
					<li className='flex cursor-pointer items-center gap-1 transition'>
						<Link href={'/support'}>Помощь</Link>
					</li>
					<Tooltip>
						<TooltipTrigger>
							<li className='hover:text-red flex cursor-pointer items-center gap-1 transition'>
								Каталоги <ChevronDown size={14} />
							</li>
						</TooltipTrigger>
						<TooltipContent className='flex flex-col px-0 text-black'>
							<Link
								className='hover:bg-gray-light/30 px-4 py-3 hover:text-black!'
								href={'/c/avto'}
							>
								Каталог автомобилей
							</Link>
							<Link
								className='hover:bg-gray-light/30 px-4 py-3 hover:text-black!'
								href={`/c/novostroyki`}
							>
								Каталог новостроек
							</Link>
						</TooltipContent>
					</Tooltip>
				</ul>
			</nav>
			<div className='flex items-center gap-3'>
				<Link
					className='text-gray-light group'
					href='/profile/favorites'
				>
					<Heart
						className='group-hover:fill-gray group-hover:stroke-gray transition'
						fill='var(--color-gray-light)'
						color='var(--color-gray-light)'
					/>
				</Link>
				<Link className='text-gray-light group' href='/cart'>
					<ShoppingCartIcon
						className='group-hover:fill-gray group-hover:stroke-gray transition'
						fill='var(--color-gray-light)'
						color='var(--color-gray-light)'
					/>
				</Link>
				<UserButton />
			</div>
		</div>
	)
}
