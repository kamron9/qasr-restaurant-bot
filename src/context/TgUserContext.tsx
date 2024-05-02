import { createContext, useState } from 'react'

interface UserType {
	phone_number: string
	telegram_id: string
	full_name: string
	is_blocked: boolean
	addresses: Array<{}>
}

const TgUserContext = createContext({
	user: {},
	setUser: (user: UserType) => {},
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
