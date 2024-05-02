import axios from 'axios'
import { useContext, useState } from 'react'
import CloseIcon from '../../../assets/CloseIcon'
import { ProductContext } from '../../../context/ProductProvider'
import { TgUserContext } from '../../../context/TgUserContext'
import styles from './order.module.css'

const OrderModalTgUser = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const { user } = useContext(TgUserContext)
	const { productState } = useContext(ProductContext)

	const postData = async (data: any) => {
		try {
			await axios.post(
				'https://avtosavdo.chogirmali.uz/api/v1/shop/orders',
				data,
				{
					headers: {
						Authorization: user.phone_number,
					},
				}
			)

			const tg = window.Telegram?.WebApp
			tg.close()
		} catch (err) {
			console.log(err)
		}
	}

	const handleData = (e: any) => {
		e.preventDefault()
		const data = productState.map(item => {
			return {
				product: item.id,
				count: item.count,
			}
		})
		postData({
			orders: data,
			delivery_type: 'delivery',
			address: e.target.address.value,
		})
	}

	return (
		<>
			<button className={styles.order_btn} onClick={() => setIsModalOpen(true)}>
				Rasmiylashtirish
			</button>
			{/*  */}
			<div
				className={`${styles.modal_wrapper} ${
					isModalOpen ? styles.active_modal : ''
				}`}
			>
				<div className={styles.order_modal}>
					<button
						onClick={() => setIsModalOpen(false)}
						className={styles.back_btn}
					>
						<CloseIcon />
					</button>
					<form className={styles.form} onSubmit={handleData}>
						<div className={styles.form_group}>
							<label className={styles.form_label} htmlFor='username'>
								Ismingiz
							</label>
							<input
								type='text'
								id='username'
								name='username'
								minLength={3}
								required
								className={styles.form_input}
							/>
						</div>
						{/* telefon number */}
						{/* qo'shimcha raqam */}
						<div className={styles.form_group}>
							<p className={styles.bold_text}>
								Telefon raqamingiz: <span>{user.phone_number}</span>
							</p>

							<label className={styles.form_label} htmlFor='other-phone'>
								Qo'shimcha raqam (ixtiyoriy)
							</label>
							<input
								className={styles.form_input}
								type='tel'
								id='other-phone'
							/>
						</div>
						{/* adress */}
						<div className={styles.form_group}>
							<label className={styles.form_label} htmlFor='address'>
								Manzilni tanlang:
							</label>
							<select
								className={styles.form_select}
								name='address'
								id='address'
							>
								{user?.addresses?.map((address: any) => (
									<option key={address.id} value={address.id}>
										{address.address}
									</option>
								))}
							</select>
						</div>
						<p className={styles.form_warning_msg}>
							Qo'shimcha manzil kiritish uchun telegram botga yangi manzilni
							yuboring
						</p>
						<button className={styles.order_submit_btn} type='submit'>
							Buyurtma berish
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default OrderModalTgUser
