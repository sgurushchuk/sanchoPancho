import { ACTION_TYPES } from '../actions';

const initialBasketState = {
	products: [],
	totalAmount: 0,
	shipping: 0,
};

export const basketReducer = (state = initialBasketState, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_PRODUCT_TO_BASKET:
			return {
				...state,
				products: [...state.products, ...action.payload.products],
				totalAmount: action.payload.totalAmount,
			};

		case ACTION_TYPES.ADD_PRODUCT_TO_BASKET:
			const index = state.products.findIndex(
				(product) => product.id === action.payload.id,
			);
			const updated = [...state.products];
			index !== -1
				? (updated.at(index).count += action.payload.count)
				: updated.push(action.payload);
			return {
				...state,
				products: updated,
				totalAmount:
					state.totalAmount + action.payload.price * action.payload.count,
			};

		case ACTION_TYPES.INCREASE_PRODUCT_COUNT_BASKET:
			const increased = state.products.map((product) =>
				product.id === action.payload.id
					? { ...product, count: (product.count += 1) }
					: product,
			);
			return {
				...state,
				products: increased,
				totalAmount: state.totalAmount + action.payload.price,
			};

		case ACTION_TYPES.DECREASE_PRODUCT_COUNT_BASKET:
			const decreased = state.products.map((product) =>
				product.id === action.payload.id
					? { ...product, count: (product.count -= 1) }
					: product,
			);

			return {
				...state,
				products: decreased,
				totalAmount: state.totalAmount - action.payload.price,
			};

		case ACTION_TYPES.REMOVE_PRODUCT_FROM_BASKET:
			const filtered = state.products.filter(
				({ id }) => id !== action.payload.id,
			);
			return {
				...state,
				products: filtered,
				totalAmount:
					state.totalAmount - action.payload.price * action.payload.count,
			};

		case ACTION_TYPES.RESET_BASKET:
			return initialBasketState;

		default:
			return state;
	}
};
