import { useContext } from 'react'
import { ProductContext } from '../../context/ProductProvider'
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

const Product = ({ product }: { product: ProductType }) => {
	const {
		productState,
		addToBasket,
		incrementProductCount,
		decrementProductCount,
	} = useContext(ProductContext)

	// get product and push it to basket
	const handleProduct = () => {
		addToBasket(product)
	}

	const increment = () => {
		incrementProductCount(product.id)
	}
	// remove product from basket if count is 1
	const decrement = () => {
		decrementProductCount(product.id)
	}

	return (
		<div className={styles.product}>
			<img
				src={product?.image}
				height={200}
				alt={product.title}
				className={styles.image}
			/>
			<p className={styles.title}>{product.title}</p>
			<p className={styles.price}>{convertPrice(product.price)} so'm</p>
			{productState.find(item => item.id === product.id) ? (
				<div>
					<button className={styles.decrement_btn} onClick={decrement}>
						-
					</button>
					<span className={styles.product_count}>
						{productState.find(item => item.id === product.id)?.count}
					</span>
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
