var passport = require('passport'),
    authController = require('../../controllers/auth');

module.exports = function (router) {
  router.post('/register', authController.register);
  router.post('/login', authController.login);
  router.get('/logout', authController.logout);
  router.get('/loggedin', authController.isLoggedIn);
  router.route('/users').get(authController.isAuthenticated, authController.getAllUsers);
  router.route('/users/:user_id').delete(authController.isAuthenticated, authController.removeUser);
};