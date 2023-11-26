import { UserRow } from './components';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Content, H1, Loader } from '../../components';
import { ROLE } from '../../constants';
import { request } from '../../utils/request';

const UsersPageContainer = ({ className }) => {
	const [isLoading, setIsloading] = useState(true);
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	useEffect(() => {
		Promise.all([request('/users'), request('/users/roles')])
			.then(([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setUsers(usersRes.data);
				console.log(usersRes.data);
				setRoles(rolesRes.data);
			})
			.finally(() => setIsloading(false));
	}, [shouldUpdateUserList]);

	const onUserRemove = async (userId) => {
		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<H1>Users</H1>
				<div>
					{isLoading ? (
						<Loader />
					) : (
						users.map(({ id, login, createdAt, roleId }) => (
							<UserRow
								key={id}
								id={id}
								login={login}
								createdAt={createdAt}
								roleId={roleId}
								roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
								onUserRemove={() => onUserRemove(id)}
							/>
						))
					)}
				</div>
			</Content>
		</div>
	);
};

export const UsersPage = styled(UsersPageContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;

	& h1 {
		margin-bottom: 36px;
	}
`;
