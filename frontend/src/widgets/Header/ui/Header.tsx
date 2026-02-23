import { HeaderBottom } from "./HeaderBottom"
import { HeaderTop } from "./HeaderTop"


export const Header = () => {
	return (
		<header className='container'>
			<HeaderTop />	
            <HeaderBottom />
		</header>
	)
}
