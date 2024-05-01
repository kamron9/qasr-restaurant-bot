import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductProvider'
import styles from './product.module.css'

export type ProductType = {
	id: number
	title: string
	price: number
	img: string
	category: string
	count: number
}

const Product = ({ product }: { product: ProductType }) => {
	const [inBasket, setInBasket] = useState(false)
	const [count, setCount] = useState(1)
	const {
		productState,
		addToBasket,
		removeFromBasket,
		incrementProductCount,
		decrementProductCount,
	} = useContext(ProductContext)

	// get product and push it to basket
	const handleProduct = () => {
		setInBasket(true)
		addToBasket(product)
	}

	const increment = () => {
		incrementProductCount(product.id)
	}
	// remove product from basket if count is 1
	const decrement = () => {
		decrementProductCount(product.id)
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
				src={product.img}
				height={200}
				alt={product.title}
				className={styles.image}
			/>
			<p className={styles.title}>{product.title}</p>
			<p className={styles.price}>{product.price.toLocaleString('ru')} so'm</p>
			{inBasket ? (
				<div>
					<button className={styles.decrement_btn} onClick={decrement}>
						-
					</button>
					<span className={styles.product_count}>{product.count}</span>
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
