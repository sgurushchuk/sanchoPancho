import { Logo, NavBar, TopBar } from './components';
import styled from 'styled-components';
import { BasketPanel } from './components/basketPanel';

const HeaderContainer = ({ className }) => (
	<div className={className}>
		<TopBar />
		<header className="header">
			<Logo />
			<NavBar />
			<BasketPanel />
		</header>
	</div>
);

export const Header = styled(HeaderContainer)`
	position: fixed;
	height: 134px;
	width: 100%;
	display: flex;
	flex-direction: column;
	top: 0;
	z-index: 999;
	max-width: 1440px;

	& .header {
		width: 100%;
		height: 94px;
		font-weight: 500;
		padding: 0 8%;
		background-color: #fdfdfd;
		display: flex;
		align-items: center;
		border-bottom: solid 1px #cacaca;
	}
`;
