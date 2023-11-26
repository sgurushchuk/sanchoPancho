import styled from 'styled-components';
import leftImage1 from '../../assets/about_us_left_1.png';
import leftImage2 from '../../assets/about_us_left_2.png';
import leftImage3 from '../../assets/about_us_left_3.png';
import rightImage1 from '../../assets/about_us_right_1.png';
import rightImage2 from '../../assets/about_us_rigth_2.png';
import rightImage3 from '../../assets/about_us_rigth_3.png';

const AboutUsPageContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="left-side">
				<h1>Welcome</h1>
				<p>
					To our online restaurant where you can enjoy a variety of dishes from
					all over the world. We are ready to offer you more than 100 different
					dishes, including pizza, sushi, burgers, snacks, desserts, drinks,
					food for children and vegetarian food. Here you will find everything
					you need for a full lunch, dinner or snack.
				</p>
				<img src={leftImage1} alt="about us" />
				<p>
					We guarantee the quality of products and the freshness of dishes
					prepared by our experienced chefs. You can choose from a variety of
					options including spicy, sweet, sour and salty flavors to suit your
					palate.
				</p>
				<img src={leftImage2} alt="about us" />
				<p>
					We strive to provide a high level of service and satisfaction to our
					customers. If you have any special requests or wishes, feel free to
					let us know and we will do our best to accommodate your needs.
				</p>
				<img src={leftImage3} alt="about us" />
			</div>
			<div className="right-side">
				<img src={rightImage1} alt="about us" />
				<p>
					We understand that for many of our customers, a quick and convenient
					way to order food is important. That's why we've created our new
					mobile app, which allows you to quickly and easily select and order
					your favorite dishes right from your phone. You can choose a
					convenient delivery method - pick up the order yourself from the
					restaurant or we will deliver it directly to your home.
				</p>
				<img src={rightImage2} alt="about us" />
				<p>
					We also have a special children's menu that includes all of their
					favorite foods. We also offer vegetarian food to meet the needs of all
					our clients.
				</p>
				<img src={rightImage3} alt="about us" />
				<p>
					Thank you for choosing our online restaurant. We hope that our food
					will bring you pleasure and allow you to enjoy flavors from all over
					the world.
				</p>
			</div>
		</div>
	);
};

export const AboutUsPage = styled(AboutUsPageContainer)`
	display: flex;
	justify-content: space-between;
	margin: 56px 0;

	& h1 {
		font-size: 32px;
		align-items: center;
		margin: 0 auto;
	}

	& p {
		font-size: 20px;
		font-weight: 300;
		width: 450px;
		margin: 120px;
	}

	& .left-side {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	& .right-side {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
`;
