import { createContext, useEffect, useState } from 'react'
import { ProductType } from '../components/Products/Products'

interface BasketContextType {
	basket: ProductType[]
	addToBasket: (product: ProductType) => void
	removeFromBasket: (product: ProductType) => void
	totalPrice: number
}

export const BasketConext = createContext<BasketContextType>({
	basket: [],
	addToBasket: () => {},
	removeFromBasket: () => {},
	totalPrice: 0,
})

const BasketProvider = ({ children }: any) => {
	const [basket, setBasket] = useState<ProductType[]>([])

	const [totalPrice, setTotalPrice] = useState(0)

	//create function to calculate total price

	//create function to add product to basket
	const addToBasket = (product: ProductType) => {
		setBasket([...basket, product])
	}

	//create function to remove product from basket
	const removeFromBasket = (product: ProductType) => {
		const newBasket = basket.filter(
			(item: ProductType) => item.id !== product.id
		)
		setBasket(newBasket)
	}
	useEffect(() => {
		const total = basket.reduce((acc, item) => acc + item.price, 0)
		setTotalPrice(total)
	}, [basket])
	return (
		<BasketConext.Provider
			value={{ basket, addToBasket, removeFromBasket, totalPrice }}
		>
			{children}
		</BasketConext.Provider>
	)
}
export default BasketProvider
