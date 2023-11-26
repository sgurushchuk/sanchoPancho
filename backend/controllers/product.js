const Product = require('../models/Product');

async function addProduct(product) {
	return await Product.create(product);
}

async function editProduct(id, product) {
	const newProduct = await Product.findByIdAndUpdate(id, product, {
		returnDocumnet: 'after',
	});

	return newProduct;
}

function deleteProduct(id) {
	return Product.deleteOne({ _id: id });
}

async function getProducts(
	search = '',
	limit = 9,
	page = 1,
	categoryParam,
	isFavoriteParam,
) {
	categoryParam = categoryParam ? { category: categoryParam } : {};
	isFavoriteParam = isFavoriteParam ? { isFavorite: true } : {};

	const [products, count] = await Promise.all([
		Product.find({
			title: { $regex: search, $options: 'i' },
			...categoryParam,
			...isFavoriteParam,
		})
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 }),
		Product.countDocuments({
			title: { $regex: search, $options: 'i' },
			...categoryParam,
		}),
	]);

	return {
		products,
		lastPage: Math.ceil(count / limit),
	};
}

function getProduct(id) {
	return Product.findById(id);
}

module.exports = {
	addProduct,
	editProduct,
	deleteProduct,
	getProduct,
	getProducts,
};
