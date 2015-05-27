var authController = require('../../controllers/auth'),
  	postController = require('../../controllers/post');

module.exports = function (router) {
	router.route('/posts')  
	  .get(postController.getAll)
	  .post(authController.isAuthenticated, postController.post);
	
	router.route('/posts/:post_id')
	  .get(postController.getOne)
	  .put(authController.isAuthenticated, postController.put)
	  .delete(authController.isAuthenticated, postController.remove);
};