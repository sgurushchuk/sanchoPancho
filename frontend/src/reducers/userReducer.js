import { ACTION_TYPES } from '../actions';
import { ROLE } from '../constants';

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_USER: {
			return {
				...state,
				...action.payload,
			};
		}
		case ACTION_TYPES.LOGOUT: {
			return initialUserState;
		}
		default:
			return state;
	}
};
