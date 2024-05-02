import ReactDOM from 'react-dom/client'
import Home from './components/Home/Home.tsx'
import DrawerProvider from './context/DrawerContext.tsx'
import ProductProvider from './context/ProductProvider.tsx'
import TgUserProvider from './context/TgUserContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<TgUserProvider>
		<DrawerProvider>
			<ProductProvider>
				<Home />
			</ProductProvider>
		</DrawerProvider>
	</TgUserProvider>
)
