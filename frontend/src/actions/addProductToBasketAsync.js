import { request } from '../utils/request';
import { addProductToBasket } from './addProductToBasket';

export const addProductToBasketAsync =
	(productId, cuantity = 1) =>
	(dispatch) =>
		request(`/products/${productId}`).then((productData) => {
			if (productData.data) {
				dispatch(addProductToBasket({ ...productData.data, count: cuantity }));
			}
			return productData;
		});
