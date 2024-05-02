import { useState } from 'react'
import CloseIcon from '../../../assets/CloseIcon'
import styles from './order.module.css'

const OrderModalTgUser = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
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
					<form className={styles.form}>
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
								Telefon raqamingiz:+998919192020
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
								<option value='1'>Urganch</option>
								<option value='2'>Xiva</option>
								<option value='3'>Qo'shko'pir</option>
							</select>
						</div>
						<p className={styles.form_warning_msg}>
							Qo'shimcha manzil kiritish uchun telegram botga yangi manzilni
							yuboring
						</p>
						<button className={styles.order_submit_btn}>Buyurtma berish</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default OrderModalTgUser
