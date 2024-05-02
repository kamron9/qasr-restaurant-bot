import { createContext, useState } from 'react'

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

const TgUserContext = createContext<TgContextType>({
	user: {},
	setUser: () => {},
})

export const useTgUser = () => TgUserContext

const TgUserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState({})

	return (
		<TgUserContext.Provider value={{ user, setUser }}>
			{children}
		</TgUserContext.Provider>
	)
}

export default TgUserProvider
