import { ACTION_TYPES } from './actionTypes';

export const setProductData = (productData) => ({
	type: ACTION_TYPES.SET_PRODUCT_DATA,
	payload: productData,
});
