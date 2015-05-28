var passport = require('passport'),
    authController = require('../../controllers/auth');

module.exports = function (router) {
  router.post('/register', authController.register);
  router.post('/login', authController.login);
  router.get('/logout', authController.logout);
  router.get('/loggedin', authController.isLoggedIn);
};