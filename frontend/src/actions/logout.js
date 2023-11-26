import { ACTION_TYPES } from './actionTypes';
import { request } from '../utils/request';

export const logout = () => {
	request('/logout', 'POST');
	return { type: ACTION_TYPES.LOGOUT };
};
