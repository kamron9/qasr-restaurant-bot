import { useContext, useEffect } from 'react'

import { IProduct, ProductContext } from '../../context/ProductProvider'
import { convertPrice } from '../../utils/helpers'
import styles from './product.module.css'

export interface ProductType {
	category_id: number
	id: number
	title: string
	price: string
	discount_percentage: number
	real_price: number
	image: string
}

const Product = ({ product }: { product: IProduct }) => {
	const { basket, addToBasket, increment, decrement, removeFromBasket } =
		useContext(ProductContext)

	const productInBasket: any = basket.find(item => product.id === item.id)

	useEffect(() => {
		if (productInBasket?.count < 1) {
			removeFromBasket(product)
		}
	}, [basket])

	return (
		<div className={styles.product}>
			<div className={styles.product_inner}>
				<img
					src={product?.image}
					height={200}
					alt={product.title}
					className={styles.image}
				/>
			</div>

			<p className={styles.title}>{product.title}</p>
			<p className={styles.price}>{convertPrice(product.price)} so'm</p>
			{productInBasket?.count > 0 ? (
				<div className={styles.product_actions}>
					<button
						className={styles.decrement_btn}
						onClick={() => decrement(product)}
					>
						-
					</button>
					<span className={styles.product_count}>{productInBasket?.count}</span>
					<button
						className={styles.increment_btn}
						onClick={() => increment(product)}
					>
						+
					</button>
				</div>
			) : (
				<button
					className={styles.add_basket_btn}
					onClick={() => addToBasket(product)}
				>
					qo'shish
				</button>
			)}
		</div>
	)
}

export default Product
