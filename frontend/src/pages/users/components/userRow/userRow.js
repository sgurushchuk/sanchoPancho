import { Button } from '../../../../components';
import { TableRow } from '../tableRow/tableRow';
import { useState } from 'react';
import styled from 'styled-components';
import { request } from '../../../../utils/request';
import { transformDate } from '../../../../utils';

const UserRowContainer = ({
	className,
	id,
	login,
	createdAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initalRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleID] = useState(userRoleId);

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const onRoleChange = ({ target }) => {
		setSelectedRoleID(Number(target.value));
	};

	const isSaveButtonDisabled = selectedRoleId === initalRoleId;

	return (
		<div className={className}>
			<TableRow>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{transformDate(createdAt)}</div>
				<select value={selectedRoleId} onChange={onRoleChange}>
					{roles.map(({ id: roleId, name: roleName }) => (
						<option key={roleId} value={roleId}>
							{roleName}
						</option>
					))}
				</select>
				<Button
					onClick={() => onRoleSave(id, selectedRoleId)}
					disabled={isSaveButtonDisabled}
				>
					Save
				</Button>
				<Button className="remove-button" onClick={onUserRemove}>
					Remove
				</Button>
			</TableRow>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;

	& select {
		height: 40px;
		border-radius: 20px;
		border: 1px solid #f2cc04;
		margin: 5px;
		padding-left: 10px;
	}

	& button {
		width: 74px;
		margin: 5px;
	}

	& .remove-button {
		background-color: #ff5151;
	}

	& .remove-button:hover {
		background-color: #ff0a0a;
	}
`;
