import styled from 'styled-components';
import { AuthPanel } from './authPanel';
import iconPhone from '../../../assets/icon-phone.svg';

const TopBarContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="phone">
				<img src={iconPhone} alt="Logo" />
				<div>(048) 555 - 55 - 55</div>
			</div>
			<AuthPanel />
		</div>
	);
};

export const TopBar = styled(TopBarContainer)`
	background-color: #9fe706;
	padding: 0 8%;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;

	& .phone {
		display: flex;
		align-items: center;
	}

	& img {
		margin-right: 6px;
		height: 16px;
	}
`;
