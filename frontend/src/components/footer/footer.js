import styled from 'styled-components';
import { Logo } from '../header/components';
import { Link } from 'react-router-dom';
import { Button } from '../button/button';

const FooterContainer = ({ className }) => {
	return (
		<footer className={className}>
			<div className="footer-column">
				<Logo />
				<p>Online restaurant with tastiest food</p>
			</div>
			<div className="footer-column">
				<Link to={'/'}>Main page</Link>
				<Link to={'/menu'}>Menu</Link>
				<Link to={'/feedback'}>Feedback</Link>
				<Link to={'/aboutUs'}>About us</Link>
			</div>
			<div className="footer-column">
				<Button>
					<Link to={'/feedback'}>Leave a review</Link>
				</Button>
			</div>
			<div className="footer-last-column">
				<p>Tel: (048) 555 - 55 - 55</p>
				<p>No weekends from 10:00 to 22:00</p>
				<p>info@sanchofood.ua</p>
			</div>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	& .footer-column {
		width: 20%;
		padding-right: 3%;
	}

	& .footer-last-column {
		width: 40%;
		padding-left: 20%;
	}

	& a {
		display: block;
		color: #fcfbfb;
		margin-bottom: 20px;
	}

	height: 320px;
	padding: 70px 10%;
	background-color: #383838;
	width: 100%;
	display: flex;
	border: solid 1px white;
	font-size: 14px;
	color: #fcfbfb;
	font-weight: 500;
`;
