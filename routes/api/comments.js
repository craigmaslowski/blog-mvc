var authController = require('../../controllers/auth'),
  	commentController = require('../../controllers/comment');

module.exports = function (router) {
	router.route('/comments/')  
	  .post(commentController.post);
	
	router.route('/comments/:comment_id')
	  .put(authController.isAuthenticated, commentController.put)
	  .delete(authController.isAuthenticated, commentController.remove);
};