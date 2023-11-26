import styled from 'styled-components';

const CategoryPickerContainer = ({ className, icon, title, setCategory }) => {
	return (
		<div className={className} onClick={() => setCategory(title)}>
			<div className="item-container">
				<div className="icon-container">
					<img src={icon} alt={title} />
				</div>
				<div className="category-title">{title}</div>
			</div>
		</div>
	);
};

export const CategoryPicker = styled(CategoryPickerContainer)`
	display: flex;
	align-items: center;
	height: 70px;
	border-bottom: 1px solid #cacaca;

	& .item-container:hover {
		cursor: pointer;
		text-shadow: 2px 2px 20px black;
	}

	& .item-container {
		display: flex;
		align-items: center;
		width: 224px;
	}

	& .icon-container {
		width: 50px;
		display: flex;
		justify-content: center;
		margin-right: 16px;
	}
`;
