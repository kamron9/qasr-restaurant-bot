import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

const BasketDrawer = () => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleDrawer = () => {
		setIsOpen(prevState => !prevState)
	}
	return (
		<>
			<button onClick={toggleDrawer}>Show</button>
			<Drawer
				style={{ zIndex: 1000, height: '100%' }}
				open={isOpen}
				onClose={toggleDrawer}
				direction='bottom'
				className='bla bla bla'
			>
				<div>Hello World</div>
				<button onClick={toggleDrawer}>close</button>
			</Drawer>
		</>
	)
}

export default BasketDrawer
