import { styled } from 'styled-components';
import leftIcon from '../../assets/left_icon.svg';
import rightIcon from '../../assets/right_icon.svg';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<button disabled={page === 1} onClick={() => setPage(page - 1)}>
				<img src={leftIcon} alt="left" />
			</button>
			<div className="current-page">{page}</div>
			<button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				<img src={rightIcon} alt="right" />
			</button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: 50px;

	& .current-page {
		width: 40px;
		height: 40px;
		border: none;
		padding: 9px;
		text-align: center;
		font-weight: 500;
	}

	& button {
		background-color: inherit;
		border: 1px solid #f2cc04;
		border-radius: 50%;
		height: 40px;
		width: 40px;
		margin: 0 7px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	& img {
		width: 10px;
	}
`;
