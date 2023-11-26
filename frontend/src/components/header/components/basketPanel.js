import { Link } from 'react-router-dom';
import shoppingBag from '../../../assets/shopping-bag.svg';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../../selectors';
import styled from 'styled-components';
import { CURRENCY } from '../../../constants';

const BasketPanelContainer = ({ className }) => {
	const basketSelect = useSelector(selectBasket);
	const total = basketSelect.totalAmount;

	return (
		<div className={className}>
			<div className="basket-sum">
				{total} {CURRENCY}
			</div>
			<div className="bag-container">
				<Link to="/checkout">
					<img src={shoppingBag} alt="Logo" width="40" height="40" />
				</Link>
			</div>
		</div>
	);
};

export const BasketPanel = styled(BasketPanelContainer)`
	width: 15%;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	& .basket-sum {
	}

	& .bag-container {
		background-color: #f2cc04;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 10px;
	}
`;
