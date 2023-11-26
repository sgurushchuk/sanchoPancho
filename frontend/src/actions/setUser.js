import { ACTION_TYPES } from './actionTypes';

export const setUser = (user) => ({
	type: ACTION_TYPES.SET_USER,
	payload: user,
});
