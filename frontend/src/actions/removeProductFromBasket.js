import { ACTION_TYPES } from './actionTypes';

export const removeProductFromBasket = (
	productId,
	productPrice,
	productCount,
) => ({
	type: ACTION_TYPES.REMOVE_PRODUCT_FROM_BASKET,
	payload: { id: productId, price: productPrice, count: productCount },
});
