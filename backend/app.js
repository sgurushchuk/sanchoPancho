require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {
	register,
	login,
	getUsers,
	getRoles,
	updateUser,
	deleteUser,
} = require('./controllers/user');
const authenticated = require('./middlewares/authenticated');
const hasRole = require('./middlewares/hasRole');
const mapUser = require('./helpers/mapUser');
const mapComment = require('./helpers/mapComment');
const ROLES = require('./constants/roles');
const {
	addProduct,
	editProduct,
	getProducts,
	getProduct,
	deleteProduct,
} = require('./controllers/product');
const mapProduct = require('./helpers/mapProduct');
const {
	addOrder,
	getOrders,
	getOrder,
	updateOrder,
} = require('./controllers/order');
const Product = require('./models/Product');
const {
	addComment,
	getComments,
	deleteComment,
} = require('./controllers/comment');

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body.login, req.body.password);
		res.cookie('token', token, { httpOnly: true }).send({
			error: null,
			user: mapUser(user),
		});
	} catch (e) {
		res.send({
			error: e.message || 'Unknown error',
		});
	}
});

app.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password);

		res.cookie('token', token, { httpOnly: true }).send({
			error: null,
			user: mapUser(user),
		});
	} catch (e) {
		res.send({
			error: e.message || 'Unknown error',
		});
	}
});

app.post('/logout', async (req, res) => {
	res.cookie('token', '', { httpOnly: true }).send({});
});

app.get('/products', async (req, res) => {
	const { products, lastPage } = await getProducts(
		req.query.search,
		req.query.limit,
		req.query.page,
		req.query.category,
		req.query.isFavorite,
	);

	res.send({ data: { lastPage, products: products.map(mapProduct) } });
});

app.get('/products/:id', async (req, res) => {
	const product = await getProduct(req.params.id);

	res.send({ data: mapProduct(product) });
});

app.post('/orders', async (req, res) => {
	const productIds = req.body.products.map(({ id }) => id);
	const products = await Product.find({ _id: { $in: productIds } });
	const newOrder = await addOrder({
		address: req.body.address,
		email: req.body.email,
		name: req.body.name,
		paymentMethod: req.body.paymentMethod,
		phone: req.body.phone,
		extra: req.body.extra,
		status: req.body.status,
		products: products,
	});
	res.send({ data: newOrder });
});

app.get('/comments', async (req, res) => {
	const comments = await getComments();

	res.send({ data: { comments: comments.map(mapComment) } });
});

app.use(authenticated);

app.post(
	'/comments',
	hasRole([ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		const newComment = await addComment({
			content: req.body.content,
			author: req.user.id,
		});
		res.send({ data: mapComment(newComment) });
	},
);

app.delete(
	'/comments/:commentId',
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		await deleteComment(req.params.commentId);

		res.send({ error: null });
	},
);

app.post('/products', hasRole([ROLES.ADMIN]), async (req, res) => {
	const newProduct = await addProduct({
		title: req.body.title,
		image: req.body.imageUrl,
		content: req.body.content,
		weight: req.body.weight,
		price: req.body.price,
		category: req.body.category,
		isFavorite: req.body.isFavorite,
	});

	res.send({ data: mapProduct(newProduct) });
});

app.patch('/products/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	const updatedPruduct = await editProduct(req.params.id, {
		title: req.body.title,
		image: req.body.imageUrl,
		content: req.body.content,
		weight: req.body.weight,
		price: req.body.price,
		category: req.body.category,
		isFavorite: req.body.isFavorite,
	});

	res.send({ data: mapProduct(updatedPruduct) });
});

app.delete('/products/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteProduct(req.params.id);

	res.send({ error: null });
});

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
	const users = await getUsers();
	res.send({ data: users.map(mapUser) });
});

app.get('/users/roles', hasRole([ROLES.ADMIN]), async (req, res) => {
	const roles = getRoles();

	res.send({ data: roles });
});

app.patch('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	const newUser = await updateUser(req.params.id, { role: req.body.roleId });

	res.send({ data: mapUser(newUser) });
});

app.delete('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteUser(req.params.id);

	res.send({
		error: null,
	});
});

app.get('/orders/:id', async (req, res) => {
	const order = await getOrder(req.params.id);
	res.send({ data: order });
});

app.get(
	'/orders',
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		const { orders, lastPage } = await getOrders(
			req.query.limit,
			req.query.page,
		);

		res.send({ data: { lastPage, orders } });
	},
);

app.patch(
	'/orders/:id',
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		const updatedOrder = await updateOrder(req.params.id, {
			status: req.body.status,
		});

		res.send({ data: updatedOrder });
	},
);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
	app.listen(port, () => console.log(`Server started on port ${port}`));
});
