import { Routes, Route } from 'react-router-dom';
import { Header, Footer, Modal, Error } from './components';
import {
	AuthorizationPage,
	MainPage,
	ProductPage,
	RegistrationPage,
	UsersPage,
	MenuPage,
	CheckoutPage,
	ConfirmedPage,
	AboutUsPage,
	FeedbackPage,
} from './pages';
import { ERROR } from './constants';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';
import styled from 'styled-components';
import { OrdersPage } from './pages/orders/orders';

const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1440px;
	width: 100%;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`;

const Page = styled.div`
	margin-top: 134px;
	min-height: 640px;
`;

export const SanchoApp = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const userData = sessionStorage.getItem('userData');

		if (!userData) {
			return;
		}

		const userDataJson = JSON.parse(userData);

		dispatch(
			setUser({
				...userDataJson,
				roleId: Number(userDataJson.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppWrapper>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<AuthorizationPage />} />
					<Route path="/register" element={<RegistrationPage />} />
					<Route path="/menu" element={<MenuPage />} />
					<Route path="/users" element={<UsersPage />} />
					<Route path="/orders" element={<OrdersPage />} />
					<Route path="/aboutUs" element={<AboutUsPage />} />
					<Route path="/feedback" element={<FeedbackPage />} />
					<Route path="/product" element={<ProductPage />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/product/:id/edit" element={<ProductPage />} />
					<Route path="/checkout" element={<CheckoutPage />} />
					<Route path="/confirmed" element={<ConfirmedPage />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppWrapper>
	);
};
