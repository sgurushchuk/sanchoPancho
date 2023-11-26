import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { RESET_PRODUCT_DATA, loadProductAsync } from '../../actions';
import { selectProduct } from '../../selectors';
import { Error } from '../../components';
import { ProductContent } from './components/productContent/productContent';
import { ProductForm } from './components/productForm/productForm';
import { styled } from 'styled-components';

const ProductPageContainer = ({ className }) => {
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const params = useParams();
	const isEditing = useMatch('/product/:id/edit');
	const isCreating = useMatch('/product');
	const product = useSelector(selectProduct);

	useLayoutEffect(() => {
		dispatch(RESET_PRODUCT_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadProductAsync(params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	return error ? (
		<Error error={error} />
	) : (
		<div className={className}>
			{isCreating || isEditing ? (
				<ProductForm {...product} />
			) : (
				<>
					<ProductContent {...product} />
				</>
			)}
		</div>
	);
};

export const ProductPage = styled(ProductPageContainer)`
	margin: 5% 15%;
`;
