import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { baseUrl } from '../utils/consts'

export interface IProduct {
	category_id: number
	id: number
	title: string
	price: string
	discount_percentage: number
	real_price: number
	image: string
}

export interface BasketType extends IProduct {
	count: number
}

export interface ProductContextProps {
	products: IProduct[]
	basket: BasketType[]
	addToBasket: (product: IProduct) => void
	removeFromBasket: (product: IProduct) => void
	calculateTotalPrice: () => number
	increment: (product: IProduct) => void
	decrement: (product: IProduct) => void
	setBasket: (basket: BasketType[] | []) => void
}

export const ProductContext = createContext<ProductContextProps>({
	products: [],
	basket: [],
	addToBasket: () => {},
	removeFromBasket: () => {},
	calculateTotalPrice: () => 0,
	increment: () => {},
	decrement: () => {},
	setBasket: () => {},
})

// Create the provider component
const ProductProvider = ({ children }: { children: React.ReactNode }) => {
	const [products, setProducts] = useState<IProduct[]>([])
	const [basket, setBasket] = useState<BasketType[]>([])

	//add product to basket
	const addToBasket = (product: IProduct) => {
		const isProductInBasket = basket.some(
			(p: BasketType) => p.id === product.id
		)

		if (!isProductInBasket) {
			const newBasket = [...basket, { ...product, count: 1 }]
			setBasket(newBasket)
		}
	}

	//remove product from basket
	const removeFromBasket = (product: IProduct) => {
		const newBasket = basket.filter((p: BasketType) => p.id !== product.id)

		setBasket(newBasket)
	}

	const increment = (product: IProduct) => {
		const newProductCount = basket.map((p: BasketType) =>
			p.id === product.id ? { ...p, count: p.count + 1 } : p
		)
		setBasket(newProductCount)
	}
	const decrement = (product: IProduct) => {
		const newProductCount = basket.map((p: BasketType) =>
			p.id === product.id ? { ...p, count: p.count - 1 } : p
		)
		setBasket(newProductCount)
	}

	//calculate total price
	const calculateTotalPrice = () => {
		return basket.reduce(
			(total: any, product: any) => total + product.price * product.count,
			0
		) as number
	}
	//get product
	const getProducts = async () => {
		try {
			const response = await axios.get<IProduct[]>(`${baseUrl}/shop/products`)
			const data = await response.data
			const product = data.map((product: IProduct) => {
				return {
					category_id: product.category_id,
					discount_percentage: product.discount_percentage,
					id: product.id,
					image: product.image,
					price: product.price,
					real_price: product.real_price,
					title: product.title,
				}
			})
			setProducts(product)
		} catch (error) {
			console.log(error instanceof Error)
		}
	}
	useEffect(() => {
		getProducts()
	}, [])

	return (
		<ProductContext.Provider
			value={{
				products,
				basket,
				addToBasket,
				removeFromBasket,
				calculateTotalPrice,
				increment,
				decrement,
				setBasket,
			}}
		>
			{children}
		</ProductContext.Provider>
	)
}
export default ProductProvider
