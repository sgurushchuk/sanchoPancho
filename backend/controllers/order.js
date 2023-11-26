const Order = require('../models/Order');

async function addOrder(order) {
	const newOrder = await Order.create(order);

	newOrder.populate('products');

	return newOrder;
}

async function getOrder(id) {
	return await Order.findById(id).populate('products');
}

async function updateOrder(id, updatedData) {
	const newOrder = await Order.updateOne(
		{ _id: id },
		{ $set: updatedData },
		{
			returnDocumnet: 'after',
		},
	);

	return newOrder;
}

function deleteOrder(id) {
	return Order.deleteOne({ _id: id });
}

async function getOrders(limit = 10, page = 1) {
	const [orders, count] = await Promise.all([
		Order.find({})
			.populate('products')
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 }),
		Order.countDocuments({}),
	]);

	return {
		orders,
		lastPage: Math.ceil(count / limit),
	};
}

module.exports = {
	addOrder,
	deleteOrder,
	getOrders,
	getOrder,
	updateOrder,
	deleteOrder,
};
