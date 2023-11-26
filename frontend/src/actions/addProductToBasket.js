import { ACTION_TYPES } from './actionTypes';

export const addProductToBasket = (productData) => ({
	type: ACTION_TYPES.ADD_PRODUCT_TO_BASKET,
	payload: productData,
});
