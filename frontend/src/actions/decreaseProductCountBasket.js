import { ACTION_TYPES } from './actionTypes';

export const decreaseProductCountBasket = (productId, productPrice) => ({
	type: ACTION_TYPES.DECREASE_PRODUCT_COUNT_BASKET,
	payload: { id: productId, price: productPrice },
});
