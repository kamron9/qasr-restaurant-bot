export function convertPrice(price: number | string): string {
	return Number(price)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
