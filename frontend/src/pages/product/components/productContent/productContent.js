import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components';
import { checkAccess } from '../../../../utils';
import { CURRENCY, ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../selectors';
import { useSelector } from 'react-redux';
import bagIcon from '../../../../assets/mini-shopping-bag.svg';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import {
	CLOSE_MODAL,
	openModal,
	removeProductAsync,
} from '../../../../actions';
import { addProductToBasketAsync } from '../../../../actions/addProductToBasketAsync';

const ProductContentsContainer = ({
	className,
	id,
	title,
	imageUrl,
	content,
	weight,
	price,
}) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const dispatch = useDispatch();
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	const onProductRemove = (id) => {
		dispatch(
			openModal({
				text: 'Remove product?',
				onConfirm: () => {
					dispatch(removeProductAsync(id)).then(() => navigate('/'));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="main-row">
				<div className="image-container">
					<img src={imageUrl} alt={title} />
				</div>
				<div className="discription-container">
					<h1>{title}</h1>
					<div className="weight">Weight - {weight} g</div>
					<div className="price-and-bag">
						<div className="price">
							{price} {CURRENCY}
						</div>
						<div className="button-container">
							<Button onClick={() => dispatch(addProductToBasketAsync(id))}>
								<img className="bagIcon" src={bagIcon} alt="" />
								<div>Add to card</div>
							</Button>
						</div>
					</div>
					<div className="text-content">{content}</div>
					{isAdmin && (
						<div className="special-buttons">
							<Button onClick={() => navigate(`/product/${id}/edit`)}>
								Edit
							</Button>
							<Button
								className="remove-button"
								onClick={() => onProductRemove(id)}
							>
								Remove
							</Button>
						</div>
					)}
				</div>
			</div>
			<div className="additional-row">
				<p className="note-weigth">
					*Weight of the cooked product with a standard set of ingredients.
					Weight in shipping orders may vary due to product dehydration.
				</p>
			</div>
		</div>
	);
};

export const ProductContent = styled(ProductContentsContainer)`
	font-weight: 500;
	font-size: 16px;
	display: flex;
	flex-direction: column;

	& .main-row {
		display: flex;
		margin-bottom: 10%;
	}

	& .image-container {
		width: 40%;
	}

	& img {
		border-radius: 5px;
		width: 100%;
	}

	& .discription-container {
		width: 60%;
		padding-left: 64px;
	}

	& h1 {
		font-weight: 500;
		margin: 0 0 24px 0;
	}

	& .text-content {
		margin: 5% 0;
		white-space: pre-line;
		width: 100%;
		word-wrap: break-word;
	}

	& .weight {
		color: #a5a5a5;
		font-size: 14px;
		margin-bottom: 24px;
	}

	& .price {
		color: #0f0f0f;
		font-size: 24px;
		display: flex;
		align-items: center;
	}

	& .bagIcon {
		margin-right: 12px;
	}

	& .price-and-bag {
		display: flex;
		justify-content: space-between;
		padding-bottom: 24px;
		border-bottom: 1px solid #cacaca;
	}

	& button {
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-bottom: 0;
	}

	& button img {
		width: 30px;
	}

	& .button-container {
		margin: 0 0 0 0;
		width: 200px;
	}

	& .note-weigth {
		color: #cacaca;
		font-size: 12px;
	}

	& .special-buttons {
		height: 94px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	& .remove-button {
		background-color: #ff5151;
	}

	& .remove-button:hover {
		background-color: #ff0a0a;
	}
`;
