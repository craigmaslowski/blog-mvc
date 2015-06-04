var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: 'String',
	body: 'String',
	date: 'Date',
	authorId: 'ObjectId'
});

module.exports = mongoose.model('Post', PostSchema);