import { ACTION_TYPES } from './actionTypes';

export const increaseProductCountBasket = (productId, productPrice) => ({
	type: ACTION_TYPES.INCREASE_PRODUCT_COUNT_BASKET,
	payload: { id: productId, price: productPrice },
});
