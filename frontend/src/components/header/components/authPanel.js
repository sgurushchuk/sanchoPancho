import { Link } from 'react-router-dom';
import { ROLE } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole, selectUserLogin } from '../../../selectors';
import { logout } from '../../../actions';
import styled from 'styled-components';

const StyledButton = styled.button`
	border: none;
	background: none;
	cursor: pointer;
	padding: 0 0 0 0;
`;

const StyledUserName = styled.div`
	font-size: 16px;
	margin-right: 10px;
	padding: 4px 8px;
	border-radius: 20px;
	background-color: #e1fbc6;
`;

const AuthPanelContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	return (
		<div className={className}>
			<div className="login-container">
				{roleId === ROLE.GUEST ? (
					<StyledButton>
						<StyledUserName>
							<Link to="/login">Sign in</Link>
						</StyledUserName>
					</StyledButton>
				) : (
					<div className="login-container">
						<StyledUserName>{login}</StyledUserName>
						<div className="logout-container">
							<svg onClick={onLogout} width="26" height="26" fill="none">
								<path
									d="M20 12H10.5M18 15L21 12L18 9M13 7V6C13 5.46957 12.7893 4.96086 12.4142 4.58579C12.0391 4.21071 11.5304 4 11 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H11C11.5304 20 12.0391 19.7893 12.4142 19.4142C12.7893 19.0391 13 18.5304 13 18V17"
									stroke="#e1fbc6"
									strokeWidth="2"
								/>
							</svg>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export const AuthPanel = styled(AuthPanelContainer)`
	display: flex;
	align-items: center;

	& .login-container {
		display: flex;
		height: 40px;
		align-items: center;
	}

	& .logout-container {
		height: 26px;
		width: 20px;
	}

	& .logout-container:hover {
		cursor: pointer;
	}

	& a:hover {
		text-shadow: 2px 2px 5px green;
	}
`;
