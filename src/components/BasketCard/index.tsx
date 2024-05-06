import { FC, useContext } from 'react'
import { IProduct, ProductContext } from '../../context/ProductProvider'
import { convertPrice } from '../../utils/helpers'
import styles from './basket.module.css'

interface BasketCardProps {
	item: IProduct
}

const BasketCard: FC<BasketCardProps> = ({ item }) => {
	const { removeFromBasket } = useContext(ProductContext)
	return (
		<div className={styles.basket_card}>
			<div className={styles.basket_card__body}>
				<img
					src={item.image}
					alt={item.title}
					className={styles.basket_card__img}
				/>
				<div className={styles.basket_card__info}>
					<h4 className={styles.basket_card__title}>{item.title}</h4>
					<p className={styles.basket_card__price}>
						{convertPrice(item.price)} so'm
					</p>
					<p>dona: {item.count}</p>
				</div>
			</div>
			<button
				className={styles.basket_card__delete_btn}
				onClick={() => removeFromBasket(item)}
			>
				o'chirish
			</button>
		</div>
	)
}

export default BasketCard
