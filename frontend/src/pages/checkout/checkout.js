import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
	AuthFormError,
	Button,
	H1,
	Input,
	ProductCounter,
} from '../../components';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../selectors';
import trashIcon from '../../assets/trash-icon.svg';
import { useDispatch } from 'react-redux';
import {
	decreaseProductCountBasket,
	increaseProductCountBasket,
	removeProductFromBasket,
} from '../../actions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { RESET_BASKET } from '../../actions/resetBasket';
import { request } from '../../utils';
import { CURRENCY, ORDER_STATUS } from '../../constants';

const checkoutFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Please fill Name')
		.min(3, 'Name should contain minimum 3 letters')
		.max(20, 'Name should contain maximum 20 letters'),
	phone: yup
		.string()
		.matches(/^[0-9]{10}$/, 'Invalid phone number')
		.required('Phone number is required'),
	email: yup
		.string()
		.max(40, 'Password should contain maximum 30 letters')
		.matches(
			/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			'Incorrect email format',
		),
	address: yup.string().required('Address is required'),
});

const CheckoutPageContainer = ({ className }) => {
	const basket = useSelector(selectBasket);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [selectedPayment, setSelectedPayment] = useState('cash');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			phone: '',
			email: '',
			address: '',
		},
		resolver: yupResolver(checkoutFormSchema),
	});

	const errorMessage =
		errors?.name?.message ||
		errors?.phone?.message ||
		errors?.email?.message ||
		errors?.address?.message;

	const onSubmit = (data, event) => {
		const submitData = {
			...data,
			status: ORDER_STATUS.NEW,
			paymentMethod: selectedPayment,
			products: basket.products.map(({ id, count }) => ({
				id: id,
				count: count,
			})),
		};

		request('/orders', 'POST', submitData);

		dispatch(RESET_BASKET);

		navigate('/confirmed');

		event.target.reset();
	};

	const onClickInreaseHandle = (id, price) =>
		dispatch(increaseProductCountBasket(id, price));

	const onClickDereaseHandle = (id, price) =>
		dispatch(decreaseProductCountBasket(id, price));

	return (
		<div className={className}>
			<div className="order-summary-container">
				<H1>Order summary</H1>
				<p>Check your items</p>
				{basket.products.length === 0 ? (
					<h4>There is not products in your basket</h4>
				) : (
					basket.products.map(({ id, title, price, imageUrl, count }) => {
						return (
							<div key={id} className="order-item">
								<div className="image-item-container">
									<img src={imageUrl} alt={title} />
								</div>
								<div className="order-item-info">
									<div className="order-item-title">{title}</div>
									<div className="order-item-price">
										{price} {CURRENCY}
									</div>
								</div>
								<div className="order-item-count-column">
									<ProductCounter
										id={id}
										price={price}
										count={count}
										onClickInrease={() => onClickInreaseHandle(id, price)}
										onClickDecrese={() => onClickDereaseHandle(id, price)}
									/>
								</div>
								<div
									className="remove-item-container"
									onClick={() =>
										dispatch(removeProductFromBasket(id, price, count))
									}
								>
									<img src={trashIcon} alt="remove item button" />
								</div>
							</div>
						);
					})
				)}
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="delivery-address-container">
					<H1>Delivery address</H1>
					<div className="inputs-container">
						{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
						<label>Name</label>
						<Input
							type="text"
							name="name"
							placeholder="Input your name"
							{...register('name')}
						/>
						<label>Phone</label>
						<Input
							type="text"
							name="phone"
							placeholder="Input phone e.g. 095 555 55 55"
							{...register('phone')}
						/>
						<label>Email</label>
						<Input
							type="text"
							name="email"
							placeholder="Input your email"
							{...register('email')}
						/>
						<label>Address</label>
						<Input
							type="text"
							name="address"
							placeholder="Input your address"
							{...register('address')}
						/>
						<label>Notes</label>
						<textarea
							name="Note"
							type="text"
							placeholder="Extra info"
							{...register('extra')}
						></textarea>
					</div>
				</div>
				<div className="payment-details-container">
					<H1>Payment details</H1>
					<p>Please choose the way you want to pay</p>
					<select
						value={selectedPayment}
						onChange={({ target }) => setSelectedPayment(target.value)}
					>
						<option value="cash">With cash</option>
						<option value="card">By card</option>
					</select>
					<div className="table">
						<div className="table-row">
							<div className="table-discription">Subtotal</div>
							<div className="table-price">
								{basket.totalAmount} {CURRENCY}
							</div>
						</div>
						<div className="table-row">
							<div className="table-discription">Shipping</div>
							<div className="table-price">
								{basket.shipping} {CURRENCY}
							</div>
						</div>
						<hr />
						<div className="table-row">
							<div className="table-discription">Total</div>
							<div className="table-price">
								{basket.totalAmount} {CURRENCY}
							</div>
						</div>
					</div>
					<Button type="submit" disabled={basket.products.length === 0}>
						Confirm order
					</Button>
				</div>
			</form>
		</div>
	);
};

export const CheckoutPage = styled(CheckoutPageContainer)`
	display: flex;
	justify-content: center;
	flex-direction: column;

	& .order-summary-container {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		border-bottom: 1px solid #cacaca;
		padding-bottom: 64px;
	}

	& .order-item {
		display: flex;
		height: 100px;
		width: 480px;
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
		margin-bottom: 10px;
	}

	& .order-item-price {
		font-size: 18px;
	}

	& .order-item-count-column {
		display: flex;
		align-items: center;
	}

	& .remove-item-container {
		display: flex;
		margin-left: 40px;
		margin-right: 20px;
	}

	& .remove-item-container img:hover {
		cursor: pointer;
	}

	& p {
		color: #cacaca;
	}

	& .image-item-container img {
		height: 100%;
	}

	& .delivery-address-container {
		margin: 0 auto;
		border-bottom: 1px solid #cacaca;
		padding-bottom: 64px;
		width: 100%;
	}

	& .inputs-container {
		width: 480px;
		margin: 0 auto;
	}

	& .delivery-address-container label {
		font-weight: 500;
		pointer-events: none;
	}

	& .delivery-address-container input {
		margin-bottom: 20px;
	}

	& .payment-details-container {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 480px;
		margin: 0 auto;
		margin-bottom: 32px;
	}

	& select {
		height: 40px;
		width: 100%;
		border-radius: 20px;
		border: 1px solid #f2cc04;
		margin: 5px;
		padding-left: 30px;
		outline: none;
		// appearance: none;
		background: transparent;
		cursor: pointer;
	}

	& .table {
		margin: 32px 0;
		width: 100%;
	}

	& .table-row {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-between;
		font-weight: 500;
	}

	& hr {
		width: 100%;
		border: none;
		height: 1px;
		background-color: #cacaca;
	}

	& textarea {
		width: 100%;
		height: 80px;
		border-radius: 5px;
		padding: 10px;
		border: 1px solid #cacaca;
		font-family: inherit;
		outline: none;
	}

	& textarea::placeholder {
		color: #cacaca;
	}
`;
