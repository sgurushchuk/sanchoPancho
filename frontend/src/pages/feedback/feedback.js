import styled from 'styled-components';
import { Button, H1, Loader } from '../../components';
import { Comment } from './components/comment';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { useState } from 'react';
import { ROLE } from '../../constants';
import { useEffect } from 'react';
import { request } from '../../utils';

const FeedbackPageContainer = ({ className }) => {
	const [isLoading, setIsloading] = useState(true);
	const [newComment, setNewComment] = useState('');
	const [comments, setComments] = useState([]);
	const userRole = useSelector(selectUserRole);
	const [isUpdateCommentsList, setIsUpdateCommentsList] = useState(false);

	useEffect(() => {
		request('/comments')
			.then(({ data: { comments } }) => {
				setComments(comments);
			})
			.finally(() => setIsloading(false));
	}, [isUpdateCommentsList]);

	const onNewCommentAdd = (content) => {
		request('/comments', 'POST', { content }).then(() => {
			setNewComment('');
			setIsUpdateCommentsList(!isUpdateCommentsList);
		});
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			<H1>Feedback from our customers</H1>
			<div className="commets-section-wrapper">
				<div className="comments-list-container">
					<div className="comments">
						{isLoading ? (
							<Loader />
						) : (
							comments.map(({ id, author, content, publishedAt }) => (
								<Comment
									key={id}
									id={id}
									author={author}
									content={content}
									publishedAt={publishedAt}
									setIsUpdateCommentsList={setIsUpdateCommentsList}
									isUpdateCommentsList={isUpdateCommentsList}
								></Comment>
							))
						)}
					</div>
				</div>
				<div className="add-comment-panel">
					<div className="add-comment-label-primary">Give feedback</div>
					<div className="add-comment-label-minor">
						You need login to leave a comment
					</div>
					<div className="new-comment">
						<label>Write a review</label>
						<textarea
							name="comment"
							value={newComment}
							placeholder="Feedback text..."
							onChange={({ target }) => setNewComment(target.value)}
						></textarea>
						<Button
							disabled={isGuest}
							onClick={() => onNewCommentAdd(newComment)}
						>
							{isGuest ? 'Login to leave comment' : 'Leave feedback'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const FeedbackPage = styled(FeedbackPageContainer)`
	& .commets-section-wrapper {
		display: flex;
		justify-content: space-between;
		margin-bottom: 64px;
	}

	& .comments-list-container {
		margin-left: 7%;
		margin-right: 32px;
		width: 60%;
	}

	& .add-comment-panel {
		width: 40%;
		margin-right: 7%;
		margin-left: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& .add-comment-label-primary {
		font-size: 24px;
		font-weight: 500;
		margin-bottom: 24px;
	}

	& .add-comment-label-minor {
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 32px;
	}

	& textarea {
		width: 100%;
		height: 220px;
		border-radius: 5px;
		padding: 10px;
		border: 1px solid #cacaca;
		font-family: inherit;
		outline: none;
		margin-top: 8px;
		margin-bottom: 16px;
		resize: none;
	}

	& label {
		font-weight: 500;
		margin-bottom: 6px;
	}
`;
