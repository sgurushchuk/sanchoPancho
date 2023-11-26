import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE } from '../../../constants/role';
import userIcon from '../../../assets/user_icon.svg';
import { request, transformDate } from '../../../utils';
import { selectUserRole } from '../../../selectors';
import { CLOSE_MODAL, openModal } from '../../../actions';
import { Button } from '../../../components';

const CommentContainer = ({
	className,
	id,
	author,
	publishedAt,
	content,
	setIsUpdateCommentsList,
	isUpdateCommentsList,
}) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Remove comment?',
				onConfirm: () => {
					request(`/comments/${id}`, 'DELETE').then(() => {
						setIsUpdateCommentsList(!isUpdateCommentsList);
						dispatch(CLOSE_MODAL);
					});
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="comment-item">
				<img src={userIcon} alt="user icon" />
				<div className="info">
					<div className="author">{author}</div>
					<div className="published-at">{transformDate(publishedAt)}</div>
					<div className="comment-text">{content}</div>
				</div>
			</div>

			{isAdminOrModerator && (
				<div className="delete">
					<Button
						className="remove-button"
						onClick={() => {
							onCommentRemove(id);
						}}
					>
						Delete
					</Button>
				</div>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	& .comment-item {
		margin: 10px;
		display: flex;
		min-height: 100px;
		border-bottom: 1px solid #cacaca;
		margin-bottom: 8px;
		padding-bottom: 20px;
	}

	& img {
		height: 50px;
		margin-right: 20px;
	}

	& .info {
		width: 100%;
	}

	& .author {
		font-size: 20px;
		margin-bottom: 6px;
	}

	& .published-at {
		display: flex;
		align-items: center;
		color: #cecece;
		margin-bottom: 10px;
	}

	& .information-panel {
		display: flex;
		align-items: center;
	}

	& .comment-text {
		font-size: 16px;
	}

	& .remove-button {
		background-color: #ff5151;
		width: 70px;
	}

	& .remove-button:hover {
		background-color: #ff0a0a;
	}
`;
