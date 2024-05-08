import { createContext, useState } from 'react'

interface DrawerContextType {
	isOpen: boolean
	toggleDrawer: () => void
	setIsOpen: (value: boolean) => void
}

export const DrawerContext = createContext<DrawerContextType>({
	isOpen: false,
	toggleDrawer: () => {},
	setIsOpen: () => {},
})

const DrawerProvider = ({ children }: any) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const toggleDrawer = () => {
		setIsOpen(prevState => !prevState)
	}

	return (
		<DrawerContext.Provider value={{ isOpen, toggleDrawer, setIsOpen }}>
			{children}
		</DrawerContext.Provider>
	)
}
export default DrawerProvider
