import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, AuthFormError } from '../../components';
import { Link, Navigate } from 'react-router-dom';
import { setUser } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { useResetForm } from '../../hooks/useResetAuthForm';
import styled from 'styled-components';
import { request } from '../../utils/request';

const authFormSchema = yup.object().shape({
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
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	font-size: 14px;
	color: #f2cc04;
`;

const AuthorizationPageContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Server request error: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<h2>Sign in</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="Login">Login</label>
				<Input
					type="text"
					placeholder="Your login"
					name="Login"
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<label htmlFor="Password">Password</label>
				<Input
					type="password"
					placeholder="Your password"
					name="Password"
					{...register('password')}
				/>
				<Button disabled={!!formError} type="submit">
					Sign in
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/register">Registration</StyledLink>
			</form>
		</div>
	);
};

export const AuthorizationPage = styled(AuthorizationPageContainer)`
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
