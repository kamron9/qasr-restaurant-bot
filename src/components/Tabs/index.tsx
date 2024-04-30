import axios from 'axios'
import { useEffect, useState } from 'react'
import Loader from '../Loader'
import Product from '../Products/Products'
import './tabs.css'

interface IProduct {
	id: number
	title: string
	price: number
	category: string
	count: number
	img: string
}

const Tabs = () => {
	const [activeTab, setActiveTab] = useState(0)
	const [tabs, setTabs] = useState<string[]>([])
	const [products, setProducts] = useState<IProduct[]>([])

	//get category
	const getTabs = async () => {
		try {
			const response = await axios.get<string[]>(
				'https://a5c85e0fa7c39836.mokky.dev/category'
			)
			const data = await response?.data
			setTabs(data)
		} catch (error) {
			console.error(error)
		}
	}

	//get Products

	const getProducts = async () => {
		try {
			const response = await axios.get<IProduct[]>(
				'https://a5c85e0fa7c39836.mokky.dev/cards'
			)
			const data = await response.data
			setProducts(data)
		} catch (error) {
			console.error(error)
		}
	}

	//filter by category

	useEffect(() => {
		getTabs()
		getProducts()
	}, [])
	return (
		<div className='tabs'>
			<div className='tab-list'>
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={`tab-button ${activeTab === index ? 'active' : ''}`}
						onClick={() => setActiveTab(index)}
					>
						{tab}
					</button>
				))}
			</div>
			{products.length === 0 && <Loader />}
			<div className='tab-content'>
				{products
					.filter(product => product.category === tabs[activeTab])
					.map(product => (
						<Product key={product.id} product={product} />
					))}
			</div>
		</div>
	)
}

export default Tabs
