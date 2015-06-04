var Comment = require('../models/Comment');

exports.post = function (req, res) {
  var comment = new Comment();
  
  comment.author = req.body.author;
  comment.body = req.body.body;
  comment.date = req.body.date;
  comment.postId = req.body.postId;

  comment.save(function (err) {
    if (err) return res.status(500).send({ message: err });
    res.json({ message: 'Comment added successfully.', comment: comment });
  });
};

exports.put = function (req, res) {
  Comment.update(
    { 
      _id: req.params.comment_id 
    }, 
    { 
      autho: req.body.author,
      body: req.body.body,
      date: req.body.date
    }, 
    function(err, num, raw) {
      if (err) return res.status(500).send( { message: err });
      res.json({ message: num + ' updated' });
    }
  );
};

exports.remove = function (req, res) {
  Comment.remove({ _id: req.params.comment_id }, function (err) {
    if (err) return res.status(500).send({ message: err });
    res.json({ message: 'Comment removed successfully.' });
  });
};