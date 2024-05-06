import { useContext, useEffect } from 'react'
import { DrawerContext } from '../../context/DrawerContext'
import { ProductContext } from '../../context/ProductProvider'
import { TgUserContext } from '../../context/TgUserContext'
import BasketDrawer from '../Drawer'
import Tabs from '../Tabs'
import AuthModal from '../modal/AuthModal/AuthModal'
import styles from './home.module.css'

declare global {
	interface Window {
		Telegram: any
	}
}

const Home = () => {
	const tg = window.Telegram?.WebApp
	const phone = localStorage.getItem('phone') || ''

	useEffect(() => {
		tg.ready()
		tg.expand()
	}, [])
	//tg?.initDataUnsafe?.user?.id
	const isUserExist = tg?.initDataUnsafe?.user?.id || phone
	const { basket } = useContext(ProductContext)
	const { toggleDrawer } = useContext(DrawerContext)
	const { user, isUserBlocked } = useContext(TgUserContext)

	return (
		<div>
			{!isUserExist && <AuthModal />}
			<div className={styles.top_header}>
				<h3>Qasr Restarani</h3>
				{JSON.stringify(user)}
				<button className={styles.top_header__btn} onClick={toggleDrawer}>
					Savatcha: {basket?.length}
				</button>
			</div>
			<b className={styles.error_msg}>{isUserBlocked}</b>
			<Tabs />
			<BasketDrawer />
		</div>
	)
}

export default Home
