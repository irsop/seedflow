import $api from '../http/index';

class OrderService {
	async create(products) {
		products = products.map((item) => ({ product: item.id, quantity: item.count }));
		const response = await $api.post('/create-order', { products: JSON.stringify(products) }, {
			'Content-Type': 'application/json',
		});
		return response.data;
	}
	async remove(id) {
		const response = await $api.post('/delete-order', { id });
		return response.data;
	}
	async get() {
		const response = await $api.get('/get-orders');
		return response.data;
	}
}

export default new OrderService();