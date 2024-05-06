import { useContext } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { DrawerContext } from '../../context/DrawerContext'
import { ProductContext } from '../../context/ProductProvider'
import { convertPrice } from '../../utils/helpers'
import BasketCard from '../BasketCard'
import OrderModalTgUser from '../modal/OrderModal/OrderModal'
import styles from './drawer.module.css'

const BasketDrawer = () => {
	const { isOpen, toggleDrawer } = useContext(DrawerContext)
	const { basket, calculateTotalPrice } = useContext(ProductContext)

	return (
		<>
			<Drawer
				style={{ zIndex: 1000, height: '100%', padding: '1rem' }}
				open={isOpen}
				onClose={toggleDrawer}
				direction='bottom'
				className='drawer'
			>
				<div className={styles.drawer_header}>
					<button className={styles.drawer_header__btn} onClick={toggleDrawer}>
						Orqaga
					</button>
					<h4>Savatcha</h4>
					{basket?.length && <OrderModalTgUser />}
				</div>
				<div className={styles.total_price}>
					<p>Umumiy summa: {convertPrice(calculateTotalPrice())} so'm</p>
				</div>
				{basket?.length ? (
					basket?.map(item => <BasketCard key={item.id} item={item} />)
				) : (
					<div className={styles.empty_basket}>
						<p>Savatcha bo'sh</p>
					</div>
				)}
			</Drawer>
		</>
	)
}

export default BasketDrawer
