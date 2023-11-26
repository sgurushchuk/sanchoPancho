import styled from 'styled-components';

const H1Container = ({ className, children }) => (
	<h1 className={className}>{children}</h1>
);

export const H1 = styled(H1Container)`
	display: flex;
	justify-content: center;
	text-align: center;
	margin: 60px;
	font-size: 32px;
`;
