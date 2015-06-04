/* global moment */
/* global marked */
/* global posts */
/* global m */
/* global removePost */
/* global commentFormComponent */
/* global commentListComponent */
/* global errorComponent */

var postDetailController = function (pageState) {
	var ctrl = this,
      id = m.route.param('id');
			
	ctrl.pageState = pageState();	
	ctrl.pageState.post = m.prop({});
	ctrl.errorCtrl = new errorComponent.controller();
	
	ctrl.commentFormController = new commentFormComponent.controller(pageState);
	
	posts.loadWithComments(id).then(function (data) {
		ctrl.pageState.post(data);
		ctrl.pageState.post().comments(ctrl.pageState.post().comments().map(function (comment) {
	    return new Comment(comment);
	  }));
		ctrl.commentListController = new commentListComponent.controller(pageState);
	}, ctrl.errorCtrl.error);
	
	ctrl.remove = removePost(ctrl);
};

var postDetailView = function (ctrl) {
	var post = ctrl.pageState.post();
	
	var postElements = [
		m('h1.title', post.title()),
		m('.body', m.trust(marked(post.body()))),
		m('.metadata', [
			m('span', 'Posted by '),
			m('span.author', post.author().firstName + post.author().lastName),
			m('span', ' on '),
			m('span.date', moment(post.date()).format('MMMM Do YYYY, h:mm a'))
		])		
	];
	
	if (ctrl.pageState.authenticated()) {
    postElements.push(m('.actions', [
      m('a[href=/edit/' + post._id() + ']', {config: m.route}, 'Edit Post'),
			m('a[href=#]', {onclick: ctrl.remove}, 'Remove Post')
    ]));
  }
	
	return m('article.post.detail.column', [ 
		postElements,
		commentListComponent.view(ctrl.commentListController),
		commentFormComponent.view(ctrl.commentFormController)
	]);
};

var postDetailComponent = {
	controller: postDetailController,
	view: postDetailView
};