import { ACTION_TYPES } from '../actions';

const initialProductState = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	weight: '',
	price: '',
};

export const productReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_PRODUCT_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPES.RESET_PRODUCT_DATA:
			return initialProductState;
		default:
			return state;
	}
};
