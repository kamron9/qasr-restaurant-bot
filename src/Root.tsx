import { useEffect } from 'react'
import Home from './components/Home/Home'
import AuthModal from './components/modal/AuthModal/AuthModal'
import DrawerProvider from './context/DrawerContext'
import ProductProvider from './context/ProductProvider'
import TgUserProvider from './context/TgUserContext'

const Root = () => {
	const tg = window.Telegram?.WebApp
	const phone = localStorage.getItem('phone') || ''

	useEffect(() => {
		tg.ready()
		tg.expand()
	}, [])
	const isUserExist = tg?.initDataUnsafe?.user?.id || phone.length > 0

	return (
		<div>
			<TgUserProvider>
				{!isUserExist && <AuthModal />}

				<DrawerProvider>
					<ProductProvider>
						<Home />
					</ProductProvider>
				</DrawerProvider>
			</TgUserProvider>
		</div>
	)
}

export default Root
