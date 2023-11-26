import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../assets/SanchoLogo.svg';

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<img src={logo} alt="Logo" width="54" height="54" />
	</Link>
);

export const Logo = styled(LogoContainer)`
	width: 15%;
`;
