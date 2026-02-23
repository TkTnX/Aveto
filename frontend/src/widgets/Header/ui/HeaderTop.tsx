import {
	ChevronDown,
	Heart,
	LockKeyholeIcon,
	Plus,
	ShoppingCartIcon
} from 'lucide-react'
import Link from 'next/link'

export const HeaderTop = () => {
	return (
		<div className='flex h-13.5 items-center justify-between justify-self-end lg:justify-self-auto'>
			<nav className='hidden lg:block'>
				<ul className='text-gray flex items-center gap-4'>
					<li className='hover:text-red flex cursor-pointer items-center gap-1 transition'>
						{/* TODO: ADD HOVER DROPDOWN (LOOK AT THE EXAMPLE) */}
						Для бизнеса
						<ChevronDown size={14} />
					</li>
					<li className='hover:text-red flex cursor-pointer items-center gap-1 transition'>
						<Link href={'/career'}>Карьера в Авето</Link>
					</li>
					<li className='hover:text-red flex cursor-pointer items-center gap-1 transition'>
						<Link href={'/support'}>Помощь</Link>
					</li>
					<li className='hover:text-red flex cursor-pointer items-center gap-1 transition'>
						{/* TODO: ADD HOVER DROPDOWN (LOOK AT THE EXAMPLE) */}
						Каталоги <ChevronDown size={14} />
					</li>
				</ul>
			</nav>
			<div className='flex items-center gap-3'>
				<Link
					className='hover:text-red text-gray-light group'
					href='/favorites'
				>
					<Heart
						className='group-hover:fill-gray group-hover:stroke-gray transition'
						fill='var(--color-gray-light)'
						color='var(--color-gray-light)'
					/>
				</Link>
				<Link
					className='hover:text-red text-gray-light group'
					href='/cart'
				>
					<ShoppingCartIcon
						className='group-hover:fill-gray group-hover:stroke-gray transition'
						fill='var(--color-gray-light)'
						color='var(--color-gray-light)'
					/>
				</Link>
				<button className='hover:text-red flex items-center gap-1'>
					<LockKeyholeIcon
						className='vsm:size-3.5 size-6'
						size={14}
					/>
					<span className='vsm:inline hidden'>
						Вход и регистрация
					</span>
				</button>
				<button className='hover:text-red flex items-center gap-1'>
					<Plus className='vsm:size-3.5 size-6' size={14} />
					<span className='vsm:inline hidden'>
						Разместить объявление
					</span>
				</button>
			</div>
		</div>
	)
}
