import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductProvider'
import { baseUrl } from '../../utils/consts'
import Loader from '../Loader'
import Product from '../Products/Products'
import './tabs.css'

interface IProduct {
	category_id: number
	id: number
	title: string
	price: string
	discount_percentage: number
	real_price: number
	image: string
}

interface ITab {
	id: number
	title: string
}

const Tabs = () => {
	const [activeTab, setActiveTab] = useState<number>(0)
	const [tabs, setTabs] = useState<ITab[]>([])
	const { products } = useContext(ProductContext)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	//get category
	const getTabs = async () => {
		try {
			const response = await axios.get<ITab[]>(`${baseUrl}/shop/categories`)
			const data = await response?.data
			setTabs(data)
			setTimeout(() => {
				setIsLoading(false)
			}, 1500)
			setActiveTab(data[0].id)
		} catch (error) {
			console.error(error)
		}
	}

	//get active tab products
	const activeTabProducts = products?.filter(
		(product: IProduct) => product.category_id === activeTab
	)

	useEffect(() => {
		getTabs()
	}, [])
	return (
		<div className='tabs'>
			<div className='tab-list'>
				{tabs.map((tab: ITab) => (
					<button
						key={tab.id}
						className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.title}
					</button>
				))}
			</div>

			{products.length === 0 && <Loader />}
			<div className='tab-content'>
				{activeTabProducts?.length > 0 &&
					activeTabProducts.map((product: IProduct) => {
						return <Product key={product.id} product={product} />
					})}
			</div>
			{activeTabProducts?.length === 0 && isLoading === false && (
				<div className={'no-product'}>
					<p>Bu menyuda xozircha maxsulot yo'q</p>
				</div>
			)}
		</div>
	)
}

export default Tabs
