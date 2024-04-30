import ReactDOM from 'react-dom/client'
import Home from './components/Home/Home.tsx'
import BasketProvider from './context/BasketProvider.tsx'
import DrawerProvider from './context/DrawerContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<DrawerProvider>
		<BasketProvider>
			<Home />
		</BasketProvider>
	</DrawerProvider>
)
