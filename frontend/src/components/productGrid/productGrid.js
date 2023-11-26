import { ProductCard } from '../../components';
import { styled } from 'styled-components';

const ProductGridContainer = ({ className, products }) => {
	return (
		<div className={className}>
			{products.length > 0 ? (
				<div className="product-list">
					{products.map(({ id, title, imageUrl, content, weight, price }) => (
						<ProductCard
							key={id}
							id={id}
							title={title}
							imageUrl={imageUrl}
							content={content}
							weight={weight}
							price={price}
						/>
					))}
				</div>
			) : (
				<div className="no-products-found">
					<h2>No products found</h2>
				</div>
			)}
		</div>
	);
};

export const ProductGrid = styled(ProductGridContainer)`
	display: flex;
	justify-content: center;

	& .no-products-found {
		text-align: center;
		display: flex;
		align-items: center;
	}

	& h2 {
		margin: 250px auto;
	}

	& .product-list {
		display: flex;
		flex-wrap: wrap;
	}
`;
