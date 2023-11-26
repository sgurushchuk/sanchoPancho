import { request } from '../utils/request';
import { setProductData } from './setProductData';

export const loadProductAsync = (productId) => (dispatch) =>
	request(`/products/${productId}`).then((productData) => {
		if (productData.data) {
			dispatch(setProductData(productData.data));
		}

		return productData;
	});
