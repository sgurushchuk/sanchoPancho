import { styled } from 'styled-components';
import searchIcon from '../../assets/search_icon.svg';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<div className="search-icon">
				<img src={searchIcon} alt="searchIcon" />
			</div>
			<input
				value={searchPhrase}
				placeholder="Input search"
				onChange={onChange}
			/>
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	margin-bottom: 24px;
	margin-left: 8px;
	width: 96%;
	height: 40px;
	border-radius: 20px;
	border: 1px solid #f2cc04;
	padding: 0 0 0 8px;

	& .search-icon {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		text-align: center;
		padding: 10px;
	}

	& input {
		background-color: inherit;
		border: none;
		width: 95%;
		outline: none;
	}
`;
