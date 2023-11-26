import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ classname, ...props }, ref) => {
	return <input className={classname} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	padding: 10px;
	margin: 0 0 10px;
	border: solid 1px #cacaca;
	border-radius: 5px;
	outline-style: none;
	height: 40px;
	width: 100%;

	&::placeholder {
		color: #cacaca;
	}
`;
