import { AuthFormError, Button, H1, Input } from '../../../../components';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveProductAsync } from '../../../../actions';
import { styled } from 'styled-components';
import { CATEGORIES } from '../../../../constants/categories';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const productFormSchema = yup.object().shape({
	imageUrl: yup.string().required('Please fill imageUrl'),
	title: yup.string().required('Please fill title'),
	content: yup.string().required('Please fill content'),
	weight: yup.number().required('Please fill weight'),
	price: yup.number().required('Please fill price'),
	category: yup.string().required('Please select some category'),
	isFavorite: yup.boolean(),
});

const ProductFormContainer = ({
	className,
	id,
	imageUrl,
	title,
	weight,
	price,
	content,
	category,
	isFavorite,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const categoriesForSelect = [{ title: 'Select product' }, ...CATEGORIES];

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			imageUrl: '',
			title: '',
			content: '',
			weight: '',
			price: '',
			category: '',
			isFavorite: false,
		},
		resolver: yupResolver(productFormSchema),
	});

	const errorMessage =
		errors?.imageUrl?.message ||
		errors?.title?.message ||
		errors?.content?.message ||
		errors?.weight?.message ||
		errors?.price?.message ||
		errors?.category?.message;

	useLayoutEffect(() => {
		setValue('imageUrl', imageUrl);
		setValue('title', title);
		setValue('content', content);
		setValue('weight', weight);
		setValue('price', price);
		setValue('category', category);
		setValue('isFavorite', isFavorite);
	}, [imageUrl, title, content, weight, price, category, isFavorite, setValue]);

	const onSubmit = ({
		imageUrl,
		title,
		content,
		weight,
		price,
		category,
		isFavorite,
	}) => {
		dispatch(
			saveProductAsync(id, {
				imageUrl,
				title,
				content,
				weight,
				price,
				category,
				isFavorite,
			}),
		).then(({ id }) => navigate(`/product/${id}`));
	};

	return (
		<div className={className}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<H1>New product</H1>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<label>ImageUrl</label>
				<Input placeholder="Input image url" {...register('imageUrl')} />
				<label>Title</label>
				<Input placeholder="Input title" {...register('title')} />
				<label>Weight</label>
				<Input placeholder="Input weight" {...register('weight')} />
				<label>Price</label>
				<Input placeholder="Input price" {...register('price')} />
				<label>Content</label>
				<Input placeholder="Input content" {...register('content')} />
				<label>Category</label>
				<select {...register('category')}>
					{categoriesForSelect.map(({ title }, index) => (
						<option key={index} value={title === 'Select product' ? '' : title}>
							{title}
						</option>
					))}
				</select>
				<label>Is favorite</label>
				<input type="checkbox" {...register('isFavorite')} />
				<Button type="submit">Save</Button>
			</form>
		</div>
	);
};

export const ProductForm = styled(ProductFormContainer)`
	font-weight: 300;
	height: 100%;

	& label {
		font-weight: 500;
		margin: 5px;
		display: block;
	}

	& .text-content {
		margin: 10px 0;
		border: solid 1px grey;
		border-radius: 5px;
		padding: 10px;
		white-space: pre-line;
	}

	& button {
		margin-top: 24px;
	}

	& select {
		height: 40px;
		border-radius: 20px;
		border: 1px solid #f2cc04;
		padding-left: 10px;
		width: 100%;
	}
`;
