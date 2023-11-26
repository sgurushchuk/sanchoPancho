const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		weight: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		isFavorite: {
			type: Boolean,
		},
	},
	{ timestamps: true },
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
