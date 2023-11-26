import React, { useState } from 'react';
import rightIcon from '../../assets/right_icon.svg';
import leftIcon from '../../assets/left_icon.svg';
import styled from 'styled-components';

const SliderContainer = ({ className, slides }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToSlide = (index) => {
		setCurrentIndex(index);
	};

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
		);
	};

	return (
		<div className={className}>
			<div
				className="slider"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{slides.map(({ slide, text }, index) => (
					<div key={index} className="slide">
						<div className="slide-text">{text}</div>
						<img src={slide} alt="slide" />
					</div>
				))}
			</div>
			<div className="button-container">
				{slides.map((slide, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={index === currentIndex ? 'active' : ''}
					></button>
				))}
			</div>

			<div className="nav-buttons">
				<button onClick={prevSlide}>
					<img src={leftIcon} alt="" />
				</button>
				<button onClick={nextSlide}>
					<img src={rightIcon} alt="" />
				</button>
			</div>
		</div>
	);
};

export const Slider = styled(SliderContainer)`
	width: 100%;
	margin: auto;
	overflow: hidden;
	position: relative;
	margin-bottom: 24px;

	& .slider {
		display: flex;
		transition: transform 0.5s ease-in-out;
	}

	& .slide {
		min-width: 100%;
		box-sizing: border-box;
		text-align: center;
		color: #fff;
		font-size: 20px;
	}

	& .nav-buttons button {
		cursor: pointer;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		outline: none;
		width: 40px;
		height: 40px;
		background-color: #e1fbc69e;
		border: none;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	& .nav-buttons button img {
		height: 20px;
	}

	& button:first-child {
		left: 24px;
	}

	& button:last-child {
		right: 24px;
	}

	& .button-container {
		text-align: center;
		margin-top: 24px;
	}

	& .button-container button {
		cursor: pointer;
		border: none;
		border-radius: 50%;
		margin: 0 8px;
		width: 14px;
		height: 14px;
	}

	& .button-container button.active {
		background-color: #e1fbc6;
	}

	& .slide img {
		height: 660px;
	}

	& .slide div {
		position: absolute;
		font-size: 96px;
		margin: 80px 100px;
		width: 470px;
		text-align: left;
	}
`;
