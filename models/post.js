var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: 'String',
	body: 'String',
	date: 'Date',
	author: { type: 'ObjectId', ref: 'User' },
	comments: [{ type: 'ObjectId', ref: 'Comment' }]
});

module.exports = mongoose.model('Post', PostSchema);