/* global moment */
/* global formatDate */
/* global m */
/* global comments */

var commentListController = function (pageState) {
  var ctrl = this;
  ctrl.pageState = pageState();  
  ctrl.errorCtrl = new errorComponent.controller();
  
  ctrl.removeComment = function (e) {
    if (confirm('This action cannot be undone. Are you sure?')) {
      var data = $(e.srcElement).data();
      Comments.remove(data.commentId).then(function () {
        // remove comment from page data 
        ctrl.pageState.post().comments(ctrl.pageState.post().comments().without(function (comment) {
          return comment._id() == data.commentId;
        })); 
      }, ctrl.errorCtrl.error);
    }
  };
};

var commentListView = function (ctrl) {
  var comments = ctrl.pageState.post().comments();
  
  return m('.ui.comments', [
		m('h3.ui.dividing.header', 'Comments'), 
    errorComponent.view(ctrl.errorCtrl),
    comments.map(function (comment, index) {
      var els = [
				m('.content', [ 
	        m('span.author', comment.author()),
					m('.metadata', [
            m('span.date', moment(comment.date()).fromNow())
          ]),
					m('.text', comment.body())
	      ])
			];
      
      if (ctrl.pageState.authenticated()) {
        els.push(m('.actions', [ 
          m('a[href=#][data-comment-id=' + comment._id() + ']', {onclick: ctrl.removeComment}, 'Remove')
        ]));
      }
      
      return m('.comment', [
        m('.content', els)
      ]);
		})
  ]);
};

var commentListComponent = {
  controller: commentListController,
  view: commentListView
};