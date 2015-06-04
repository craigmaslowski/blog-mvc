var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: 'String',
	body: 'String',
	date: 'Date',
	author: { type: 'ObjectId', ref: 'User' },
	comments: [{ type: 'ObjectId', ref: 'Comment' }]
});

var Post;

if (mongoose.models.Post) {
  Post = mongoose.model('Post');
} else {
  Post = mongoose.model('Post', PostSchema);
}

module.exports = Post;