var postDetailController = function (pageState) {
	var ctrl = this,
      id = m.route.param('id');
			
	ctrl.pageState = pageState;	
	ctrl.pageState().post = m.prop({});
	ctrl.errorCtrl = new errorComponent.controller();
	
	posts.load(id).then(ctrl.pageState().post, ctrl.errorCtrl.error);
};

var postDetailView = function (ctrl) {
	var post = ctrl.pageState().post();
	
	return m('article.post-detail.column', [
		m('h1.title', post.title()),
		m('.body', post.body()),
		m('.meta', 'Posted on ' + formatDate(post.date()))
	]);
};

var postDetailComponent = {
	controller: postDetailController,
	view: postDetailView
};