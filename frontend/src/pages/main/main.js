import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { MAIN_PAGINATIOPN_LIMIT } from '../../constants';
import { Loader, ProductGrid } from '../../components';
import { request } from '../../utils';
import { Slider } from '../../components/slider/slider';
import slide1 from '../../assets/slide_1.png';
import slide2 from '../../assets/slide_2.png';
import slide3 from '../../assets/slide_3.png';
import slide4 from '../../assets/slide_4.png';
import mainPageImage from '../../assets/image_main.png';

const MainContainer = ({ className }) => {
	const [isLoading, setIsloading] = useState(true);
	const [products, setProducts] = useState([]);

	const slides = [
		{ slide: slide1, text: 'Try our new delicious burger' },
		{ slide: slide4, text: 'New vegetarian menu!' },
		{ slide: slide2, text: 'New Sushi Set!' },
		{ slide: slide3, text: 'Birthday Special!' },
	];

	useEffect(() => {
		request(`/products?&limit=${MAIN_PAGINATIOPN_LIMIT}&isFavorite=true`)
			.then(({ data: { products } }) => {
				setProducts(products);
			})
			.finally(() => setIsloading(false));
	}, []);

	return (
		<div className={className}>
			<Slider slides={slides} />
			<div className="products-container">
				{isLoading ? <Loader /> : <ProductGrid products={products} />}
			</div>
			<div className="bottom-block-main">
				<div>
					<h1>About delivering</h1>
					<p>
						The history of ready-made food delivery dates back to the late 19th
						century, when the chef of one of the Naples pizzerias named Raffaele
						Esposito cooked and delivered pizza for the Italian king and queen.
					</p>
					<p>
						This service is relevant and in demand in the modern world. It is
						believed that this service will become more popular in the future.
						It is quick and easy to do this: go to the site, place an order and
						wait for the courier. Food ordering services with delivery to the
						office, home and outdoor events are very popular, because the modern
						rhythm of life practically does not give a chance to realize one's
						culinary talent to the fullest, especially when it comes to living
						in large cities and metropolitan areas.
					</p>
					<h1>Takeaway food from an online restaurant</h1>
					<p>
						Ordering food at home and anywhere in Odessa is not difficult if you
						turn to professionals in their field - the online restaurant "Sancho
						Pancho". The convenient menu of the site makes it easy to choose the
						category of dishes you like and order a specific dish according to
						your taste preferences.
					</p>
					<p>
						The price, weight, composition and even the number of calories,
						proteins, fats and carbohydrates are also indicated there. For
						better visualization, each dish is photographed in the same form in
						which you receive it!
					</p>
				</div>
				<div>
					<img src={mainPageImage} alt="people eating" />
				</div>
			</div>
		</div>
	);
};

export const MainPage = styled(MainContainer)`
	min-height: 500px;

	& .products-container {
		padding: 0 7%;
	}

	& .bottom-block-main {
		margin: 100px 0;
		padding-left: 8%;
		color: #0f0f0f;
		display: flex;
		justify-content: space-between;
	}

	& .bottom-block-main h1 {
		font-size: 32px;
		margin: 32px 0;
	}

	& .bottom-block-main img {
		margin-top: 90px;
	}

	& .bottom-block-main p {
		width: 620px;
		font-size: 16px;
		line-height: 24px;
	}
`;
