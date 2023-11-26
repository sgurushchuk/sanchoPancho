const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
	{
		address: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		extra: {
			type: String,
		},
		status: {
			type: String,
			required: true,
		},
		products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
	},
	{ timestamps: true },
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
