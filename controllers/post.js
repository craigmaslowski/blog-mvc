var Post = require('../models/Post');

exports.getAll = function (req, res) {
  Post.find().sort('-date').exec(function (err, posts) {
    if (err) res.status(500).send({ message: err });
    res.json(posts);
  });
};

exports.getOne = function (req, res) {
  Post.findById(req.params.post_id, function (err, post) {
    if (err) res.status(500).send({ message: err });
    res.json(post);
  });
};

exports.post = function (req, res) {
  var post = new Post();
  
  post.title = req.body.title;
  post.body = req.body.body;
  post.date = req.body.date;
  post.ownerId = req.user._id;

  post.save(function (err) {
    if (err) res.status(500).send({ message: err });
    res.json({ message: 'Post added successfully.', data: post });
  });
};

exports.put = function (req, res) {
  Post.update(
    { 
      _id: req.params.post_id 
    }, 
    { 
      title: req.body.title,
      body: req.body.body,
      date: req.body.date
    }, 
    function(err, num, raw) {
      if (err) res.status(500).send( { message: err });
      res.json({ message: num + ' updated' });
    }
  );
};

exports.remove = function (req, res) {
  Post.remove({ _id: req.params.post_id }, function(err) {
    if (err) res.status(500).send({ message: err });
    res.json({ message: 'Post removed successfully.' });
  });
};