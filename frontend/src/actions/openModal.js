import { ACTION_TYPES } from './actionTypes';

export const openModal = (modalParams) => ({
	type: ACTION_TYPES.OPEN_MODAL,
	payload: modalParams,
});
