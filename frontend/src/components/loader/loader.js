import styled from 'styled-components';

const LoaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="loader"></div>
			<p>Loading...</p>
		</div>
	);
};

export const Loader = styled(LoaderContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 60vh;

	& .loader {
		border: 8px solid #f3f3f3;
		border-top: 8px solid #e1fbc6;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
