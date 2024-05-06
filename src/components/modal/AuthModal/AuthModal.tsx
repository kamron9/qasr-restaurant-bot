import { useContext, useState } from 'react'
import styles from './auth.module.css'

import 'react-modern-drawer/dist/index.css'
import { TgUserContext } from '../../../context/TgUserContext'

const AuthModal = () => {
	const [isOpen, setIsOpen] = useState(true)
	const [input, setInput] = useState('')
	const { sendUser } = useContext(TgUserContext)

	const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		sendUser(`+998${input}`)
		localStorage.setItem('phone', `+998${input}`)
		setIsOpen(false)
	}

	return (
		<>
			<div
				className={`${styles.modal_overlay} ${!isOpen && styles.close_modal}`}
			>
				<div className={styles.modal}>
					<h3 className={styles.modal_title}>Kirish</h3>
					<form onSubmit={handleInput} className={styles.auth_form}>
						<label className={styles.auth_label} htmlFor='input'>
							Telefon raqam kiriting:
						</label>
						<div className={styles.form_group}>
							<span className={styles.form_group_addOn}>+998</span>
							<input
								type='tel'
								minLength={9}
								id='input'
								maxLength={9}
								value={input.replace(/\D/g, '')}
								onChange={e => setInput(e.target.value)}
								required
								className={styles.auth_input}
							/>
						</div>

						<button type='submit' className={styles.auth_btn}>
							kirish
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default AuthModal
