import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BasketConext } from '../../context/BasketProvider'
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
		<div className={styles.wrapper}>
			{products.map((product, index) => (
				<Product key={index} product={product} />
			))}
			{basket.length > 0 && (
				<Link to={'/basket'} className={styles.bottom_link}>
					<button className={styles.bottom_btn}>savatchaga o'tish</button>
				</Link>
			)}
		</div>
	)
}

export default Home
