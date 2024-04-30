import { useContext, useEffect, useState } from 'react'
import { BasketConext } from '../../context/BasketProvider'
import { DrawerContext } from '../../context/DrawerContext'
import BasketDrawer from '../Drawer'
import Product from '../Products/Products'
import styles from './home.module.css'
type ProductType = {
	id: number
	title: string
	price: number
	image: string
	category: string
}

const Home = () => {
	const [products, setProducts] = useState<ProductType[]>([])
	const { basket } = useContext(BasketConext)
	const { toggleDrawer } = useContext(DrawerContext)

	const fetchProducts = async () => {
		const response = await fetch('https://fakestoreapi.com/products')
		const data = await response.json()
		setProducts(data)
		console.log(data)
	}
	useEffect(() => {
		fetchProducts()
	}, [])
	return (
		<div>
			<div className={styles.top_header}>
				<h3>Qasr Restarani</h3>
				<button className={styles.top_header__btn} onClick={toggleDrawer}>
					Savatcha: {basket.length}
				</button>
			</div>
			<div className={styles.wrapper}>
				{products.map((product, index) => (
					<Product key={index} product={product} />
				))}
				<BasketDrawer />
			</div>
		</div>
	)
}

export default Home
