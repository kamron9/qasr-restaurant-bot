import { useContext } from 'react'
import { BasketConext } from '../../context/BasketProvider'
import styles from './basket.module.css'

// interface Iitem {
// 	img: string
// 	title: string
// 	id: number
// 	category: string
// 	price: number
// 	count: number
// }

const BasketCard = ({ item }: any) => {
	const { removeFromBasket } = useContext(BasketConext)
	return (
		<div className={styles.basket_card}>
			<div className={styles.basket_card__body}>
				<img
					src={item.img}
					alt={item.title}
					className={styles.basket_card__img}
				/>
				<div className={styles.basket_card__info}>
					<h4 className={styles.basket_card__title}>{item.title}</h4>
					<p className={styles.basket_card__price}>
						{item.price.toLocaleString('ru')} so'm
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
