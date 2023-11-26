const Comment = require('../models/Comment');

async function getComments() {
	return await Comment.find({}).populate('author');
}

async function addComment(comment) {
	return await Comment.create(comment);
}

async function deleteComment(commentId) {
	await Comment.deleteOne({ _id: commentId });
}

module.exports = {
	getComments,
	addComment,
	deleteComment,
};
