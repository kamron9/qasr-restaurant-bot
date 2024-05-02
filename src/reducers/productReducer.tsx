import { ProductCartType } from '../context/ProductProvider'

export const productReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'ADD_TO_BASKET':
			return [...state, { ...action.product, count: 1 }]
		case 'REMOVE_FROM_BASKET':
			return state.filter(
				(product: ProductCartType) => product.id !== action.id
			)
		case 'INCREMENT_PRODUCT_COUNT':
			return state.map((product: ProductCartType) =>
				product.id === action.id
					? { ...product, count: product.count + 1 }
					: product
			)
		case 'DECREMENT_PRODUCT_COUNT':
			if (
				state.find((product: ProductCartType) => product.id === action.id)
					.count === 1
			) {
				return state.filter(
					(product: ProductCartType) => product.id !== action.id
				)
			} else {
				return state.map(
					(product: ProductCartType) =>
						product.id === action.id && { ...product, count: product.count - 1 }
				)
			}
		default:
			return state
	}
}
