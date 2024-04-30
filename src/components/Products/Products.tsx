import { useContext, useEffect, useState } from 'react'
import { BasketConext } from '../../context/BasketProvider'
import styles from './product.module.css'

export type ProductType = {
	id: number
	title: string
	price: number
	image: string
	category: string
}

const Product = ({ product }: { product: ProductType }) => {
	const [inBasket, setInBasket] = useState(false)
	const [count, setCount] = useState(1)
	const { addToBasket, removeFromBasket } = useContext(BasketConext)

	// get product and push it to basket
	const handleProduct = () => {
		setInBasket(true)
		addToBasket({ ...product })
	}

	const increment = () => setCount(count + 1)
	// remove product from basket if count is 1
	const decrement = () => {
		setCount(count > 1 ? count - 1 : count)
		if (count === 1) {
			setInBasket(false)
			removeFromBasket(product)
		}
	}

	useEffect(() => {
		if (!inBasket) {
			setCount(1)
		}
	}, [inBasket])

	return (
		<div className={styles.product}>
			<img
				src={product.image}
				height={200}
				alt={product.title}
				className={styles.image}
			/>
			<p className={styles.title}>{product.title}</p>
			<p className={styles.price}>${product.price}</p>
			{inBasket ? (
				<div>
					<button className={styles.decrement_btn} onClick={decrement}>
						-
					</button>
					<span className={styles.product_count}>{count}</span>
					<button className={styles.increment_btn} onClick={increment}>
						+
					</button>
				</div>
			) : (
				<button className={styles.add_basket_btn} onClick={handleProduct}>
					qo'shish
				</button>
			)}
		</div>
	)
}

export default Product
