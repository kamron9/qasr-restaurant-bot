import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import BasketProvider from './context/BasketProvider'
import BasketPage from './pages/BasketPage'
import HomePage from './pages/HomePage'

const route = createBrowserRouter([
	{ path: '/', element: <HomePage /> },
	{ path: '/basket', element: <BasketPage /> },
])

const Root = () => {
	return (
		<BasketProvider>
			<RouterProvider router={route} />
		</BasketProvider>
	)
}

export default Root
