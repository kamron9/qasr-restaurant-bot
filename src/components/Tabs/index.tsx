import axios from 'axios'
import { useEffect, useState } from 'react'
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
	images: {
		image: string
	}[]
}

interface ITab {
	id: number
	title: string
	image: string
}

const Tabs = () => {
	const [activeTab, setActiveTab] = useState<number>(0)
	const [tabs, setTabs] = useState<ITab[]>([])
	const [products, setProducts] = useState<IProduct[]>([])

	//get category
	const getTabs = async () => {
		try {
			const response = await axios.get<ITab[]>(
				'https://avtosavdo.chogirmali.uz/api/v1/shop/categories'
			)
			const data = await response?.data
			setTabs(data)
			setActiveTab(data[0].id)
		} catch (error) {
			console.error(error)
		}
	}

	//get Products

	const getProducts = async () => {
		try {
			const response = await axios.get<IProduct[]>(
				'https://avtosavdo.chogirmali.uz/api/v1/shop/products'
			)
			const data = await response.data
			setProducts(data)
		} catch (error) {
			console.error(error)
		}
	}
	let arr = new Array(10).fill({
		id: 1,
		image:
			'https://avtosavdo.chogirmali.uz/media/categories/IMG_20240429_182336_252.jpg',
		parent: null,
		title: 'Ichimliklar',
	})
	//filter by category
	useEffect(() => {
		getTabs()
		getProducts()
	}, [])
	return (
		<div className='tabs'>
			<div className='tab-list'>
				{arr.map((tab, index) => (
					<button
						key={index}
						className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.title}
					</button>
				))}
			</div>
			{products.length === 0 && <Loader />}
			<div className='tab-content'>
				{products
					.filter(product => product.category_id === activeTab)
					.map(product => (
						<Product key={product.id} product={product} />
					))}
			</div>
		</div>
	)
}

export default Tabs
