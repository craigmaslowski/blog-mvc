var passport = require('passport'),
		User = require('../models/user'),
    Post = require('../models/post');

exports.getAllUsers = function (req, res) {
  User.find(function (err, users) {
    if (err) return res.status(500).send({ message: err });
    res.json(users);
  });
};

exports.removeUser = function (req, res) {
  if (req.user._id == req.params.user_id)
    return res.status(500).send({ message: 'You can\'t remove your own account.' });
  
  Post.update({author: req.params.user_id}, { author: req.user._id }, function (err) {
    if (err) return res.status(500).send({ message: err });
    
    User.remove({ _id: req.params.user_id }, function (err) {
      if (err) return res.status(500).send({ message: err });
      res.json({ message: 'User removed successfully.' });
    });  
  });
};
    
exports.register = function (req, res) {
  User.register(new User({ 
      username : req.body.username, 
      firstName: req.body.firstName, 
      lastName: req.body.lastName 
    }), 
    req.body.password, 
    function (err, user) {
      if (err) return res.status(500).send(err);
      
      res.json({ message: 'User registered successfully', user: { 
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      }});
  });
};

exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (!user) return res.status(500).send({ message: 'Username or password are incorrect' });
    
    if (!user) return res.status(500).send({ message: 'User not found' });

    req.login(user, function(err) {
      if (err) return next(err);
      return res.json({ message: 'User authenticated' });
    });
  })(req, res, next);
};

exports.logout = function (req, res) {
  req.logout();
  req.session.destroy(function (err) {
    if (err) return res.status(500).send({ message: 'An error occurred logging out.' });
    res.clearCookie('connect.sid');
    res.json({ message: 'User logged out' });
  });
};

exports.isAuthenticated = function (req, res, next) {
    if (!req.user) 
      return res.status(401).send({ message: 'You are not authorized to perform that action.' });
    next();
};

exports.isLoggedIn = function (req, res) {
  res.json((typeof req.user !== 'undefined'));
};