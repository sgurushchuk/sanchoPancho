import { H1, Loader, Pagination, ProductGrid, Search } from '../../components';
import { useState } from 'react';
import { CATEGORIES } from '../../constants/categories';
import { CategoryPicker } from './components/categoryPicker/categoryPicker';
import styled from 'styled-components';
import { useEffect } from 'react';
import { debounce, request } from '../../utils';
import { MENU_PAGINATIOPN_LIMIT } from '../../constants';
import { useMemo } from 'react';

const MenuPageContainer = ({ className }) => {
	const [isLoading, setIsloading] = useState(true);
	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState(CATEGORIES.at(0).title);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		request(
			`/products?search=${searchPhrase}&page=${page}&limit=${MENU_PAGINATIOPN_LIMIT}&category=${category}`,
		)
			.then(({ data: { products, lastPage } }) => {
				setProducts(products);
				setLastPage(lastPage);
			})
			.finally(() => setIsloading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch, category]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 1000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<H1>{category}</H1>
			<div className="menu-container">
				<div className="menu-items">
					{CATEGORIES.map(({ title, icon }, index) => (
						<CategoryPicker
							setCategory={setCategory}
							key={index}
							icon={icon}
							title={title}
						/>
					))}
				</div>
				<div className="products-container">
					<Search searchPhrase={searchPhrase} onChange={onSearch} />
					{isLoading ? <Loader /> : <ProductGrid products={products} />}
					{lastPage > 1 && products.length > 0 && (
						<Pagination page={page} lastPage={lastPage} setPage={setPage} />
					)}
				</div>
			</div>
		</div>
	);
};

export const MenuPage = styled(MenuPageContainer)`
	display: flex;
	flex-direction: column;
	padding: 0 7%;

	& .menu-container {
		display: flex;
	}

	& .products-container {
		width: 75%;
	}

	& .menu-items {
		margin: 44px 14px 0 0;
		width: 230px;
	}
`;
