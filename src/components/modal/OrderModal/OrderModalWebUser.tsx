import axios from 'axios'
import { useContext, useState } from 'react'
import CloseIcon from '../../../assets/CloseIcon'
import { BasketType, ProductContext } from '../../../context/ProductProvider'
import styles from './order.module.css'

const OrderModalWebUser = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const { basket } = useContext(ProductContext)
	const [phone, setPhone] = useState<string>('')
	const userPhoneNumber = localStorage.getItem('phone') || ''

	const postData = async (data: any) => {
		try {
			await axios.post('https://qasr.chogirmali.uz/api/v1/shop/orders', data, {
				headers: {
					Authorization: userPhoneNumber,
				},
			})

			const tg = window.Telegram?.WebApp
			tg.close()
		} catch (err) {
			console.log(err)
		}
	}

	const handleData = (e: any) => {
		e.preventDefault()
		const data = basket?.map((item: BasketType) => {
			return {
				product: item.id,
				count: item.count,
			}
		})

		postData({
			orders: data,
			delivery_type: 'delivery',
			address: e.target.address.value,
			secondary_phone_number: `+998${phone}`,
			full_name: e.target.username.value,
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
								Telefon raqamingiz: <span>{userPhoneNumber}</span>
							</p>

							<label className={styles.form_label} htmlFor='other-phone'>
								Qo'shimcha raqam (ixtiyoriy)
							</label>

							<div className={styles.form_group_phone}>
								<span className={styles.form_group_addOn}>+998</span>
								<input
									type='tel'
									minLength={9}
									id='input'
									name='phone'
									maxLength={9}
									value={phone.replace(/\D/g, '')}
									onChange={e => setPhone(e.target.value)}
									required
									className={styles.form_input_phone}
								/>
							</div>
						</div>
						{/* adress */}
						<div className={styles.form_group}>
							<label className={styles.form_label} htmlFor='address'>
								Manzil kiriting:
							</label>

							<input type='text' name='address' className={styles.form_input} />
							<p className={styles.form_warning_msg}>
								etibor bering dastavka xizmatimiz faqat Qo'shko'pir tumani
								bo'ylab mavjud
							</p>
						</div>

						<button className={styles.order_submit_btn} type='submit'>
							Buyurtma berish
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default OrderModalWebUser
