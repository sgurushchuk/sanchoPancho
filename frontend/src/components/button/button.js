import styled from 'styled-components';

const ButtonContainer = ({ children, classname, width, ...props }) => {
	return (
		<button className={classname} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	color: #fcfbfb;
	padding: 10px;
	margin: 0 0 10px;
	border: none;
	border-radius: 20px;
	background-color: #f2cc04;
	cursor: pointer;
	height: 40px;
	width: ${({ width = '100%' }) => width};
	&:hover {
		background-color: #ffd600;
	}

	&:disabled {
		background-color: #f3e9b2;
	}
`;
