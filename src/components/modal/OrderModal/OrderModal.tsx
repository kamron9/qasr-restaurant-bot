import axios from 'axios'
import { useContext, useState } from 'react'
import CloseIcon from '../../../assets/CloseIcon'
import { BasketType, ProductContext } from '../../../context/ProductProvider'
import { TgUserContext } from '../../../context/TgUserContext'
import styles from './order.module.css'

const OrderModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const { basket } = useContext(ProductContext)
	const [phone, setPhone] = useState<string>('')
	const { user } = useContext(TgUserContext)
	const userPhoneNumber = localStorage.getItem('phone') || user?.phone_number
	const isTgUserExist = user?.telegram_id ? true : false

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
									className={styles.form_input_phone}
								/>
							</div>
						</div>
						{/* adress */}
						{isTgUserExist ? (
							<div className={styles.form_group}>
								<label className={styles.form_label} htmlFor='address'>
									Manzilni tanlang:
								</label>
								<select
									className={styles.form_select}
									name='address'
									id='address'
								>
									{user?.addresses?.map((item: any) => (
										<option key={item.id} value={item.address}>
											{item?.address}
										</option>
									))}
								</select>
								<p className={styles.form_warning_msg}>
									Qo'shimcha manzil kiritish uchun botga yangi manzil jo'nating
								</p>
							</div>
						) : (
							<div className={styles.form_group}>
								<label className={styles.form_label} htmlFor='address'>
									Manzil kiriting:
								</label>

								<input
									type='text'
									name='address'
									className={styles.form_input}
								/>
								{!isTgUserExist && (
									<p className={styles.form_warning_msg}>
										E'tibor bering dastavka xizmatimiz faqat Qo'shko'pir tumani
										bo'ylab mavjud
									</p>
								)}
							</div>
						)}

						<button className={styles.order_submit_btn} type='submit'>
							Buyurtma berish
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default OrderModal
