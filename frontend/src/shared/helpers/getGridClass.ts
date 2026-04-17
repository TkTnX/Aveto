export const getGridClass = (count: number) => {
    	switch (count) {
			case 1:
				return 'grid-cols-1'
			case 2:
				return 'grid-cols-2'
			case 3:
				return 'grid-cols-2 grid-rows-2'
			case 4:
				return 'grid-cols-2 grid-rows-2'
			default:
				return 'grid-cols-3'
		}
}