/* global moment */
/* global formatDate */
/* global m */
/* global comments */

var commentListController = function (pageState) {
  var ctrl = this;
  ctrl.pageState = pageState();  
};

var commentListView = function (ctrl) {
  var comments = ctrl.pageState.post().comments();
  
  return m('.ui.comments', [
		m('h3.ui.dividing.header', 'Comments'), 
    comments.map(function (comment, index) {
      return m('.comment', [
				m('.content', [ 
	        m('span.author', comment.author()),
					m('.metadata', [
            m('span.date', moment(comment.date()).fromNow())
          ]),
					m('.text', comment.body())
	      ])
			]);
		})
  ]);
};

var commentListComponent = {
  controller: commentListController,
  view: commentListView
};