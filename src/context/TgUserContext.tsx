import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

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
	const [isUserBlocked, setIsUserBlocked] = useState<any>('')

	const getTgUser = async (phone?: string) => {
		const tg = window.Telegram?.WebApp
		//get telegram user id
		const id = tg?.initDataUnsafe?.user?.id
		try {
			const response = await axios.post(
				`https://qasr.chogirmali.uz/api/v1/users/auth`,
				{
					telegram_id: id,
					phone_number: phone || localStorage.getItem('phone'),
				}
			)
			const data = await response.data
			setUser(data)
		} catch (error: any) {
			setIsUserBlocked(error.response.data.errors[0].detail)
		}
	}

	const sendUser = (phone: string) => {
		getTgUser(phone)
	}

	useEffect(() => {
		const tg = window.Telegram?.WebApp
		//get telegram user id
		const id = tg?.initDataUnsafe?.user?.id
		if (id) {
			getTgUser()
		}
	}, [])

	return (
		<TgUserContext.Provider value={{ user, setUser, isUserBlocked, sendUser }}>
			{children}
		</TgUserContext.Provider>
	)
}

export default TgUserProvider
