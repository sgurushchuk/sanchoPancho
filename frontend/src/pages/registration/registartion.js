import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, AuthFormError } from '../../components';
import { Navigate } from 'react-router-dom';
import { setUser } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import styled from 'styled-components';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { useResetForm } from '../../hooks/useResetAuthForm';
import { request } from '../../utils/request';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Please fill Login')
		.matches(/^\w+$/, 'Login should contain letters and/or numbers')
		.min(3, 'Login should contain minimum 3 letters')
		.max(15, 'Login should contain maximum 15 letters'),
	password: yup
		.string()
		.required('Please fill Password')
		.matches(
			/^[\w!@#$%]+$/,
			'Password should contain letters, numbers and symbols !@#$%',
		)
		.min(6, 'Password should contain minimum 6 letters')
		.max(30, 'Password should contain maximum 30 letters'),
	passCheck: yup
		.string()
		.required('Please fill Password check')
		.oneOf([yup.ref('password'), null], 'Passwords should match'),
	phone: yup
		.string()
		.matches(/^[0-9]{10}$/, 'Invalid phone number')
		.required('Phone number is required'),
});

const RegistrationPageContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			phone: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Server request error: ${error}`);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
			},
		);
	};

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passCheck?.message ||
		errors?.phone?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<h2>Registration</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="Login">Login*</label>
				<Input
					type="text"
					placeholder="Your login"
					name="Login"
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<label htmlFor="Password">Password*</label>
				<Input
					type="password"
					placeholder="Your password"
					name="Password"
					{...register('password')}
				/>
				<label htmlFor="rePassword">Confirm Password*</label>
				<Input
					type="password"
					placeholder="Confirm your password"
					name="rePassword"
					{...register('passCheck')}
				/>
				<label htmlFor="Phone">Phone*</label>
				<Input
					type="text"
					placeholder="Your phone number"
					name="Phone"
					{...register('phone')}
				/>
				<Button disabled={!!formError} type="submit">
					Register
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const RegistrationPage = styled(RegistrationPageContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 500;

	& label {
		font-size: 12px;
		margin-bottom: 4px;
	}

	& button {
		margin-top: 10px;
		margin-bottom: 28px;
	}

	& Input {
		margin-bottom: 28px;
	}

	& h2 {
		margin: 40px;
	}

	& > form {
		display: flex;
		flex-direction: column;
		width: 390px;
	}
`;
