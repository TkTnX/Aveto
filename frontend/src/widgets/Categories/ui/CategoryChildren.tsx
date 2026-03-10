import { ICategory } from "@/src/shared/types"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface Props {
  category: ICategory
}

export const CategoryChildren = ({ category }: Props) => {
  return (
		<div className='flex-1'>
			<Link
				className='flex items-center gap-2 text-2xl font-bold transition'
				href={`/c/${category?.slug}`}
			>
				{category.name} <ChevronRight size={28} />
			</Link>
			<ul className='vsm:grid-cols-2 mt-4 grid w-full gap-2 md:grid-cols-3'>
				{category.children && category.children.map(cat => (
					<CategoryChildren category={cat} key={cat.id} />
				))}
			</ul>
		</div>
  )
}
