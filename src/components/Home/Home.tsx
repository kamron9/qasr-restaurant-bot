import { useContext } from 'react'
import { DrawerContext } from '../../context/DrawerContext'
import { ProductContext } from '../../context/ProductProvider'
import { TgUserContext } from '../../context/TgUserContext'
import BasketDrawer from '../Drawer'
import Tabs from '../Tabs'
import styles from './home.module.css'

declare global {
	interface Window {
		Telegram: any
	}
}

const Home = () => {
	const { basket } = useContext(ProductContext)
	const { toggleDrawer } = useContext(DrawerContext)
	const { user, isUserBlocked } = useContext(TgUserContext)

	return (
		<div>
			<div className={styles.top_header}>
				<h3>Qasr Restarani</h3>
				<div style={{ color: 'blue' }}>{JSON.stringify(user)}</div>
				<button className={styles.top_header__btn} onClick={toggleDrawer}>
					Savatcha: {basket?.length}
				</button>
			</div>
			<b className={styles.error_msg}>{JSON.stringify(isUserBlocked)}</b>
			<Tabs />
			<BasketDrawer />
		</div>
	)
}

export default Home
