import { createContext, useReducer } from 'react'
import { ProductType } from '../components/Products/Products'
import { productReducer } from '../reducers/productReducer'

interface ProductContextType {
	productState: ProductType[]
	addToBasket: (product: ProductType) => void
	removeFromBasket: (product: ProductType) => void
	totalPrice: (product: ProductType) => void
	incrementProductCount: (id: number) => void
	decrementProductCount: (id: number) => void
}

export const ProductContext = createContext<ProductContextType>({
	productState: [],
	addToBasket: () => {},
	removeFromBasket: () => {},
	totalPrice: () => {},
	incrementProductCount: () => {},
	decrementProductCount: () => {},
})

const ProductProvider = ({ children }: any) => {
	const [productState, dispatch] = useReducer(productReducer, [])

	const addToBasket = (product: ProductType) => {
		dispatch({ type: 'ADD_TO_BASKET', product })
	}

	const removeFromBasket = (product: ProductType) => {
		dispatch({ type: 'REMOVE_FROM_BASKET', id: product.id })
	}

	const totalPrice = (product: ProductType) => {
		dispatch({ type: 'TOTAL_PRICE', item: product })
	}

	const incrementProductCount = (id: number) => {
		dispatch({ type: 'INCREMENT_PRODUCT_COUNT', id })
	}

	const decrementProductCount = (id: number) => {
		dispatch({ type: 'DECREMENT_PRODUCT_COUNT', id })
	}

	return (
		<ProductContext.Provider
			value={{
				productState,
				addToBasket,
				removeFromBasket,
				totalPrice,
				incrementProductCount,
				decrementProductCount,
			}}
		>
			{children}
		</ProductContext.Provider>
	)
}
export default ProductProvider
