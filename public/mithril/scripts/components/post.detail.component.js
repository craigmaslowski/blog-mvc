/* global marked */
var postDetailController = function (pageState) {
	var ctrl = this,
      id = m.route.param('id');
			
	ctrl.pageState = pageState;	
	ctrl.pageState().post = m.prop({});
	ctrl.errorCtrl = new errorComponent.controller();
	
	posts.load(id).then(ctrl.pageState().post, ctrl.errorCtrl.error);
	
	ctrl.remove = removePost(ctrl);
};

var postDetailView = function (ctrl) {
	var post = ctrl.pageState().post();
	
	var postElements = [
		m('h1.title', post.title()),
		m('.body', m.trust(marked(post.body()))),
		m('.meta', 'Posted on ' + formatDate(post.date()))
	];
	
	if (ctrl.pageState().authenticated()) {
    postElements.push(m('.actions', [
      m('a[href=/edit/' + post._id() + ']', {config: m.route}, 'Edit Post'),
			m('a[href=#]', {onclick: ctrl.remove}, 'Remove Post')
    ]));
  }
	
	return m('article.post.detail.column', [ postElements ]);
};

var postDetailComponent = {
	controller: postDetailController,
	view: postDetailView
};