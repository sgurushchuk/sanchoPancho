module.exports = function (product) {
	return {
		id: product.id,
		title: product.title,
		imageUrl: product.image,
		content: product.content,
		weight: product.weight,
		price: product.price,
		category: product.category,
		isFavorite: product.isFavorite,
	};
};
