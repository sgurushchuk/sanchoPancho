import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ConfirmedPageContainer = ({ className }) => {
	return (
		<div className={className}>
			<h1>Your order is confirmed</h1>
			<h3>Check your email and phone for details</h3>
			<Link to={'/menu'}>Return to Menu</Link>
		</div>
	);
};

export const ConfirmedPage = styled(ConfirmedPageContainer)`
	margin: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;

	& h3 {
		margin-bottom: 40px;
	}

	& a {
		text-decoration: underline;
		color: #f2cc04;
		font-size: 18px;
	}
`;
