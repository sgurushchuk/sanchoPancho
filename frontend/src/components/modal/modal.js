import { styled } from 'styled-components';
import { Button } from '../button/button';
import { useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../selectors';

const ModalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalIsOpen);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="100px" onClick={onConfirm}>
						Ok
					</Button>
					<Button width="100px" onClick={onCancel}>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	rigth: 0;
	bottom: 0;
	left: 0;
	// position: absolute;
	background-color: rgba(0, 0, 0, 0.7);
	width: 100%;
	height: 100%;

	& .overlay {
		// position: absolute;
		// background-color: rgba(0, 0, 0, 0.7);
		// width: 100%;
		// height: 100%;
	}

	& .box {
		text-align: center;
		position: relative;
		z-index: 30;
		width: 300px;
		margin: auto;
		top: 50%;
		transform: translate(0, -50%);
		background-color: #fff;
		padding: 5px 20px 20px;
		border-radius: 10px;
	}

	& button {
		margin: 0 5px;
		border-radius: 5px;
	}
`;
