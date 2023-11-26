import styled from 'styled-components';

const ProductCounterContainer = ({
	className,
	id,
	price,
	count,
	onClickInrease,
	onClickDecrese,
}) => {
	return (
		<div className={className}>
			<button disabled={count === 1} onClick={onClickDecrese}>
				-
			</button>
			<div className="order-item-count">{count}</div>
			<button onClick={onClickInrease}>+</button>
		</div>
	);
};

export const ProductCounter = styled(ProductCounterContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 24px;

	& button {
		width: 24px;
		height: 100%;
		border: none;
		border-radius: 5px;
		background-color: #e1fbc6;
		cursor: pointer;
	}

	& .order-item-count {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
	}
`;
