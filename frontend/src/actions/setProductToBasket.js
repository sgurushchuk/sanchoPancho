import { ACTION_TYPES } from './actionTypes';

export const setProductToBasket = (product) => ({
	type: ACTION_TYPES.SET_PRODUCT_TO_BASKET,
	payload: product,
});
