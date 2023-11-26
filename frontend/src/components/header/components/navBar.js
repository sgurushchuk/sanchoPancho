import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROLE } from '../../../constants';
import { checkAccess } from '../../../utils/checkAccess';
import { selectUserRole } from '../../../selectors';
import { useSelector } from 'react-redux';

const NavBarContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<nav className={className}>
			<Link to={'/menu'}>Menu</Link>
			<Link to={'/feedback'}>Feedback</Link>
			<Link to={'/aboutUs'}>About us</Link>
			{isAdmin && (
				<>
					<Link to={'/users'}>Users</Link>
					<Link to={'/product'}>Add product</Link>
					<Link to={'/orders'}>Orders</Link>
				</>
			)}
		</nav>
	);
};

export const NavBar = styled(NavBarContainer)`
	width: 70%;

	& a {
		margin-right: 32px;
		font-size: 16px;
	}

	& a:hover {
		text-shadow: 2px 2px 20px black;
	}
`;
