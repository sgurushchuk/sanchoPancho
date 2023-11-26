import styled from 'styled-components';
import { Button } from '../button/button';
import { CURRENCY, ORDER_STATUS } from '../../constants';
import { transformDate } from '../../utils';

const OrderCardContainer = ({
	className,
	_id: orderId,
	createdAt,
	address,
	email,
	name,
	paymentMethod,
	phone,
	extra,
	status,
	products,
	onClick,
}) => {
	return (
		<div className={className}>
			<div className="upper-wrapper">
				<div className="left-info-wrapper">
					<h3>Order {orderId}</h3>
					<h4>{transformDate(createdAt)}</h4>
					<div className="order-card-info">
						<label>Name</label>
						<div className="info">{name}</div>
						<label>Phone</label>
						<div className="info">{phone}</div>
						<label>Email</label>
						<div className="info">{email}</div>
						<label>Address</label>
						<div className="info">{address}</div>
						<label>Payment Method</label>
						<div className="info">{paymentMethod}</div>
						<label>Extra info</label>
						<div className="info">{extra}</div>
					</div>
				</div>
				<div className="checkbox-wrapper">
					{status === ORDER_STATUS.COMPLETED && (
						<svg width="180" height="180" viewBox="0 0 512 512" fill="none">
							<path
								d="M400 48H112C95.0318 48.0185 78.7639 54.7673 66.7656 66.7656C54.7673 78.7639 48.0185 95.0318 48 112V400C48.0185 416.968 54.7673 433.236 66.7656 445.234C78.7639 457.233 95.0318 463.981 112 464H400C416.968 463.981 433.236 457.233 445.234 445.234C457.233 433.236 463.981 416.968 464 400V112C463.981 95.0318 457.233 78.7639 445.234 66.7656C433.236 54.7673 416.968 48.0185 400 48ZM364.25 186.29L229.85 346.29C228.376 348.046 226.541 349.465 224.471 350.45C222.4 351.435 220.143 351.964 217.85 352H217.58C215.337 351.999 213.12 351.527 211.072 350.614C209.023 349.701 207.19 348.367 205.69 346.7L148.09 282.7C146.627 281.148 145.489 279.32 144.743 277.323C143.997 275.325 143.658 273.198 143.745 271.068C143.833 268.937 144.345 266.846 145.252 264.916C146.16 262.986 147.444 261.257 149.029 259.831C150.614 258.404 152.468 257.309 154.482 256.61C156.497 255.91 158.631 255.62 160.759 255.757C162.887 255.894 164.966 256.455 166.874 257.407C168.782 258.359 170.481 259.682 171.87 261.3L217.16 311.62L339.75 165.71C342.5 162.531 346.39 160.561 350.58 160.227C354.771 159.894 358.924 161.222 362.142 163.926C365.361 166.629 367.386 170.491 367.781 174.676C368.175 178.861 366.907 183.033 364.25 186.29Z"
								fill="#e1fbc6"
							/>
						</svg>
					)}
				</div>
			</div>

			<div className="order-card-products">
				{products.map(({ image, title, price, _id: productId }) => (
					<div key={productId} className="order-item">
						<div className="image-item-container">
							<img src={image} alt={title} />
						</div>
						<div className="order-item-info">
							<div className="order-item-title">{title}</div>
							<div className="order-item-price">
								{price} {CURRENCY}
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="order-item-title">
				Total: {products.reduce((sum, product) => sum + product.price, 0)}{' '}
				{CURRENCY}
			</div>
			<div className="button-container">
				<Button
					disabled={status === ORDER_STATUS.COMPLETED}
					onClick={() => onClick(orderId)}
				>
					Complete order
				</Button>
			</div>
		</div>
	);
};

export const OrderCard = styled(OrderCardContainer)`
	width: 600px;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	margin: 8px 8px;
	border: 1px solid #cacaca;
	border-radius: 10px;
	padding: 20px;

	& img {
		height: 100%;
	}

	& .upper-wrapper {
		display: flex;
	}

	& .left-info-wrapper {
		width: 70%;
	}

	& .checkbox-wrapper {
		width: 30%;
	}

	& .info {
		background-color: #f6f6f6;
		font-size: 16px;
		margin-bottom: 8px;
		padding: 4px;
		border-radius: 5px;
		height: 26px;
	}

	& label {
		font-weight: 500;
		display: block;
		margin-bottom: 2px;
	}

	& .order-item {
		display: flex;
		height: 80px;
		width: 100%;
		font-weight: 500;
		border-bottom: 1px solid #cacaca;
		margin-bottom: 8px;
		padding-bottom: 8px;
	}

	& .image-item-container {
		margin-right: 24px;
	}

	& .order-item-info {
		padding: 16px;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	& .order-item-title {
		font-size: 20px;
	}

	& .order-item-price {
		font-size: 10px;
	}

	& .button-container {
		margin-top: 16px;
	}
`;
