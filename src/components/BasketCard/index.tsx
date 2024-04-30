import { useContext } from 'react'
import { BasketConext } from '../../context/BasketProvider'
import styles from './basket.module.css'

const BasketCard = ({ item }: any) => {
	const { removeFromBasket } = useContext(BasketConext)
	return (
		<div className={styles.basket_card}>
			<div className={styles.basket_card__body}>
				<img src={item.image} alt='' className={styles.basket_card__img} />
				<div className={styles.basket_card__info}>
					<h4 className={styles.basket_card__title}>{item.title}</h4>
					<p className={styles.basket_card__price}>{item.price}</p>
				</div>
			</div>
			<button
				className={styles.basket_card__btn}
				onClick={() => removeFromBasket(item)}
			>
				o'chirish
			</button>
		</div>
	)
}

export default BasketCard
