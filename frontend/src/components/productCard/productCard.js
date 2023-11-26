import { Link } from 'react-router-dom';
import { Button } from '../button/button';
import bagIcon from '../../assets/mini-shopping-bag.svg';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { addProductToBasketAsync } from '../../actions/addProductToBasketAsync';
import { ProductCounter } from '../productCounter/productCounter';
import { useState } from 'react';
import { CURRENCY } from '../../constants';

const ProductCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	content,
	weight,
	price,
}) => {
	const dispatch = useDispatch();
	const [count, setCount] = useState(1);

	const onClickInreaseHandle = () => setCount(count + 1);
	const onClickDecreseHandle = () => setCount(count - 1);

	return (
		<div className={className}>
			<Link to={`/product/${id}`}>
				<div className="thumb">
					<div className="img-Container">
						<img className="product-image" src={imageUrl} alt={title}></img>
					</div>
				</div>
				<h3>{title}</h3>
				<div className="product-card-info">
					<div className="weight">Weight - {weight} g</div>
					<div className="content">{content}</div>
				</div>
			</Link>
			<div className="product-card-price-counter">
				<div className="price">
					{price} {CURRENCY}
				</div>
				<ProductCounter
					id={id}
					price={price}
					count={count}
					onClickInrease={onClickInreaseHandle}
					onClickDecrese={onClickDecreseHandle}
				/>
			</div>
			<div className="button-container">
				<Button
					onClick={() => {
						dispatch(addProductToBasketAsync(id, count));
						setCount(1);
					}}
				>
					<img className="bagIcon" src={bagIcon} alt="" />
					<div>Add to cart</div>
				</Button>
			</div>
		</div>
	);
};

export const ProductCard = styled(ProductCardContainer)`
	width: 288px;
	height: 540px;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	margin: 8px 8px;
	border: 1px solid #cacaca;
	border-radius: 10px;

	& .product-image {
		width: 100%;
	}

	& .thumb {
		border-radius: 10px 10px 0 0;
		width: 100%;
		height: 220px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	& .img-Container {
		width: 94%;
	}

	& h3 {
		text-align: center;
		margin-bottom: 24px;
	}

	& .product-card-info {
		padding: 0 35px;
	}

	& .product-card-price-counter {
		padding: 0 35px;
		display: flex;
		justify-content: space-between;
		height: 40px;
	}

	& .weight {
		font-weight: 300;
		color: #4d4d4d;
		margin-bottom: 24px;
	}

	& .content {
		height: 72px;
		font-weight: 300;
		color: #4d4d4d;
		margin-bottom: 20px;
	}

	& .price {
		color: '#131212';
		font-weight: 500;
		margin-bottom: 44px;
	}

	& .bagIcon {
		margin-right: 12px;
	}

	& .button-container {
		padding: 0 35px;
	}

	& button {
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;
