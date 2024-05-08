import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { baseUrl } from '../utils/consts'

interface TgContextType {
	user: any
	setUser: any
	isUserBlocked: any
	sendUser: (phone: string) => void
}

export const TgUserContext = createContext<TgContextType>({
	user: {},
	setUser: () => {},
	isUserBlocked: '',
	sendUser: () => {},
})

const TgUserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState({})
	const [isUserBlocked, setIsUserBlocked] = useState<any>(false)

	const tg = window.Telegram?.WebApp
	//get telegram user id
	const id = tg?.initDataUnsafe?.user?.id

	const getTgUser = async (phone?: string) => {
		try {
			const response = await axios.post(`${baseUrl}/users/auth`, {
				telegram_id: id,
				phone_number: phone || localStorage.getItem('phone'),
			})
			const data = await response.data
			setUser(data)
			setIsUserBlocked(data.is_blocked)
		} catch (error: any) {
			// error.response.data.errors[0].detail
			console.log(error)
		}
	}

	const sendUser = (phone: string) => {
		getTgUser(phone)
	}

	useEffect(() => {
		tg.ready()

		const user = localStorage.getItem('phone') as any
		if (id || user?.length > 0) {
			getTgUser()
		}
	}, [id])

	return (
		<TgUserContext.Provider value={{ user, setUser, isUserBlocked, sendUser }}>
			{children}
		</TgUserContext.Provider>
	)
}

export default TgUserProvider
