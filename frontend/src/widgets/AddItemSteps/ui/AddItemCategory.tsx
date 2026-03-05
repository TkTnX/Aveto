import { ChevronRight } from 'lucide-react';
import { useState } from 'react';



import { useAddItemStore } from '@/src/shared';
import { ICategory } from '@/src/shared/types';











interface Props {
	cat: ICategory
}

export const AddItemCategory = ({ cat }: Props) => {
	const { setCategory } = useAddItemStore()
	const [showChildren, setShowChildren] = useState(false)
	return (
		<div className='relative flex flex-1 gap-2'>
			<button
				onClick={() =>
					cat.children?.length > 0
						? setShowChildren(true)
						: setCategory(cat.id)
				}
				className='hover:bg-gray/10 flex flex-1 items-center justify-between rounded-lg px-4.5 py-2.5'
				key={cat.id}
			>
				{cat.name}
				{cat.children?.length > 0 && <ChevronRight />}
			</button>
			<div className='absolute left-full z-2'>
				{cat.children?.length > 0 &&
					showChildren &&
					cat.children.map(category => (
						<AddItemCategory cat={category} key={category.id} />
					))}
			</div>
		</div>
	)
}
