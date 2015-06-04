var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	author: 'String',
	body: 'String',
	date: 'Date',
	postId: {type: 'ObjectId', ref: 'Post'}
});

var Comment;

if (mongoose.models.Comment) {
  Comment = mongoose.model('Comment');
} else {
  Comment = mongoose.model('Comment', CommentSchema);
}


module.exports = mongoose.model('Comment', CommentSchema);