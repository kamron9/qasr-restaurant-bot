import { useContext, useEffect } from 'react'
import { DrawerContext } from '../../context/DrawerContext'
import { ProductContext } from '../../context/ProductProvider'
import BasketDrawer from '../Drawer'
import Tabs from '../Tabs'
import styles from './home.module.css'

declare global {
	interface Window {
		Telegram: any
	}
}

const Home = () => {
	const tg = window.Telegram?.WebApp

	useEffect(() => {
		tg.ready()
		tg.expand()
	}, [])

	const { productState } = useContext(ProductContext)
	const { toggleDrawer } = useContext(DrawerContext)
	return (
		<div>
			<div className={styles.top_header}>
				<h3>Qasr Restarani</h3>
				<h2>{tg?.initDataUnsafe?.user?.id}</h2>
				<button className={styles.top_header__btn} onClick={toggleDrawer}>
					Savatcha: {productState.length}
				</button>
			</div>
			<Tabs />
			<BasketDrawer />
		</div>
	)
}

export default Home
