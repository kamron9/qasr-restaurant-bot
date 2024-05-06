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
	isUserBlocked?: any
}

export const TgUserContext = createContext<TgContextType>({
	user: {},
	setUser: () => {},
	isUserBlocked: '',
})

const TgUserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState({})
	const [isUserBlocked, setIsUserBlocked] = useState<any>('')

	useEffect(() => {
		const tg = window.Telegram?.WebApp

		const id = tg?.initDataUnsafe?.user?.id
		try {
			axios
				.post(`https://qasr.chogirmali.uz/api/v1/users/auth`, {
					telegram_id: id,
					// phone_number: localStorage.getItem('phone'),
				})
				.then(data => {
					setUser(data.data)
				})
		} catch (error) {
			setIsUserBlocked(error)
		}
	}, [])

	return (
		<TgUserContext.Provider value={{ user, setUser, isUserBlocked }}>
			{children}
		</TgUserContext.Provider>
	)
}

export default TgUserProvider
