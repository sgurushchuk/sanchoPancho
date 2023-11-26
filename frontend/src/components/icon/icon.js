import styled from 'styled-components';

const IconContainer = ({ className, id, ...rest }) => (
	<div className={className}>
		<i className={`fa ${id}`} {...rest} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ fontSize }) => fontSize};
	margin: ${({ margin }) => margin};
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};

	& :hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
	}
`;
