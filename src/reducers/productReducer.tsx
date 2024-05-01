import { ProductType } from '../components/Products/Products'

export const productReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'ADD_TO_BASKET':
			return [...state, { ...action.product, count: 1 }]
		case 'REMOVE_FROM_BASKET':
			return state.filter((product: ProductType) => product.id !== action.id)
		case 'INCREMENT_PRODUCT_COUNT':
			return state.map((product: ProductType) =>
				product.id === action.id
					? { ...product, count: product.count + 1 }
					: product
			)
		case 'DECREMENT_PRODUCT_COUNT':
			return state.map((product: ProductType) =>
				product.id === action.id && product.count > 1
					? { ...product, count: product.count - 1 }
					: product
			)
		case 'TOTAL_PRICE':
			return state.reduce(
				(acc: number, item: ProductType) => acc + item.price * item.count,
				0
			)
		default:
			return state
	}
}
