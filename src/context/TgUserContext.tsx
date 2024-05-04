import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

// interface UserType {
// 	phone_number: string
// 	telegram_id: string
// 	full_name: string
// 	is_blocked: boolean
// 	addresses: Array<{}>
// }

interface TgContextType {
	user: any
	setUser: any
}

export const TgUserContext = createContext<TgContextType>({
	user: {},
	setUser: () => {},
})

const TgUserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState({})

	useEffect(() => {
		const tg = window.Telegram?.WebApp

		const id = tg?.initDataUnsafe?.user?.id
		axios
			.post(`https://avtosavdo.chogirmali.uz/api/v1/users/auth`, {
				telegram_id: id,
				// phone_number: localStorage.getItem('phone'),
			})
			.then(data => {
				setUser(data.data)
			})
	}, [])

	return (
		<TgUserContext.Provider value={{ user, setUser }}>
			{children}
		</TgUserContext.Provider>
	)
}

export default TgUserProvider
