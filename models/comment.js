var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	author: 'String',
	body: 'String',
	date: 'Date',
	postId: 'ObjectId'
});

module.exports = mongoose.model('Comment', CommentSchema);