import { createContext, useState } from 'react'
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
	const [basket, setBasket] = useState<any>([])

	const [totalPrice, setTotalPrice] = useState(0)

	//create function to calculate total price
	const calculateTotalPrice = () => {
		let total = basket.reduce(
			(acc: number, item: ProductType) => acc + item.price,
			0
		)
		setTotalPrice(total)
	}

	const addToBasket = (product: ProductType) => {
		setBasket([...basket, product])
		calculateTotalPrice()
	}

	console.log(basket)

	const removeFromBasket = (product: ProductType) => {
		const newBasket = basket.filter(
			(item: ProductType) => item.id !== product.id
		)
		setBasket(newBasket)
	}

	return (
		<BasketConext.Provider
			value={{ basket, addToBasket, removeFromBasket, totalPrice }}
		>
			{children}
		</BasketConext.Provider>
	)
}
export default BasketProvider
