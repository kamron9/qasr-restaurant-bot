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
		//get telegram user id
		const id = tg?.initDataUnsafe?.user?.id

		//get user by telegram id
		const getTgUser = async () => {
			try {
				const response = await axios.post(
					`https://qasr.chogirmali.uz/api/v1/users/auth`,
					{
						telegram_id: id,
						// phone_number: localStorage.getItem('phone'),
					}
				)
				const data = await response.data
				setUser(data)
			} catch (error: any) {
				setIsUserBlocked({
					data: error.response,
					status: error.response.status,
				})
			}
		}
		getTgUser()
	}, [])

	return (
		<TgUserContext.Provider value={{ user, setUser, isUserBlocked }}>
			{children}
		</TgUserContext.Provider>
	)
}

export default TgUserProvider
