var passport = require('passport'),
		User = require('../models/user');
    
exports.register = function (req, res) {
  User.register(new User({ 
      username : req.body.username, 
      firstName: req.body.firstName, 
      lastName: req.body.lastName 
    }), 
    req.body.password, 
    function (err, account) {
      if (err) return res.status(500).send(err);
  
      passport.authenticate('local')(req, res, function () {
        res.json({ message: 'User registered successfully'});
      });
  });
};

exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(500).send({ message: "User not found" });

    req.login(user, function(err) {
      if (err) return next(err);
      return res.json({ message: 'User authenticated' });
    });
  })(req, res, next);
};

exports.logout = function (req, res) {
  req.logout();
  req.session.destroy(function (err) {
    if (err) res.status(500).send({ message: 'An error occurred logging out.' });
    res.clearCookie('connect.sid');
    res.json({ message: 'User logged out' });
  });
};

exports.isAuthenticated = function (req, res, next) {
    if (!req.user) 
      res.status(401).send({ message: 'You are not authorized to perform that action.' });
    return next();
};

exports.isLoggedIn = function (req, res) {
  res.json((typeof req.user !== 'undefined'));
};