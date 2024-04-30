import { useContext } from 'react'
import { BasketConext } from '../../context/BasketProvider'
import { DrawerContext } from '../../context/DrawerContext'
import BasketDrawer from '../Drawer'
import Tabs from '../Tabs'
import styles from './home.module.css'

const Home = () => {
	const { basket } = useContext(BasketConext)
	const { toggleDrawer } = useContext(DrawerContext)

	return (
		<div>
			<div className={styles.top_header}>
				<h3>Qasr Restarani</h3>
				<button className={styles.top_header__btn} onClick={toggleDrawer}>
					Savatcha: {basket.length}
				</button>
			</div>
			<Tabs />
			<BasketDrawer />
		</div>
	)
}

export default Home
