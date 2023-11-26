import moment from 'moment';

export function transformDate(isoDate) {
	return moment(isoDate).format('YYYY-MM-DD HH:mm');
}
