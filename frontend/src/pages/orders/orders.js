import styled from 'styled-components';
import { H1, Loader, OrderCard, Pagination } from '../../components';
import { useEffect } from 'react';
import { request } from '../../utils';
import { useState } from 'react';
import { ORDERS_PAGINATIOPN_LIMIT, ORDER_STATUS } from '../../constants';

const OrdersPageContainer = ({ className }) => {
	const [isLoading, setIsloading] = useState(true);
	const [orders, setOrders] = useState([]);
	const [isRefreshPage, setIsRefreshPage] = useState(false);
	const [lastPage, setLastPage] = useState(1);
	const [page, setPage] = useState(1);

	useEffect(() => {
		request(`/orders?page=${page}&limit=${ORDERS_PAGINATIOPN_LIMIT}`)
			.then(({ data: { orders, lastPage } }) => {
				setOrders(orders);
				setLastPage(lastPage);
			})
			.finally(() => setIsloading(false));
	}, [page, isRefreshPage]);

	const onClickHandle = (orderId) => {
		request(`/orders/${orderId}`, 'PATCH', { status: ORDER_STATUS.COMPLETED });
		setIsRefreshPage(!isRefreshPage);
	};

	return (
		<div className={className}>
			<H1>Orders</H1>
			{isLoading ? (
				<Loader />
			) : (
				orders.map((order) => {
					return (
						<OrderCard key={order._id} onClick={onClickHandle} {...order} />
					);
				})
			)}
			{lastPage > 1 && orders.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const OrdersPage = styled(OrdersPageContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
