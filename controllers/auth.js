var passport = require('passport'),
		User = require('../models/user');
    
exports.register = function (req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function (err, account) {
    if (err) return res.send(500, err);

    passport.authenticate('local')(req, res, function () {
      res.json({ message: 'User registered successfully'});
    });
  });
};

exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.json(403, { message: "User not found" });

    req.login(user, function(err) {
      if (err) return next(err);
      return res.json({ message: 'User authenticated' });
    });
  })(req, res, next);
};

exports.logout = function (req, res) {
  req.logout();
  res.json({ message: 'User logged out' });
};

exports.isAuthenticated = function isAuthenticated(req, res, next) {
    if (!req.user) 
      res.send(401, { message: 'You are not authorized to perform that action.' });
    return next();
};
