/* global mainNavigationModule */
/* global mixinLayout */
/* global layoutModule */
/* global errorModule */
/* global formatDate */
/* global m */
/* global posts */

var postListController = function () {
  var ctrl = this;
  ctrl.posts = m.prop([]);
  ctrl.errorCtrl = new errorModule.controller();
  posts.load().then(ctrl.posts, function () { ctrl.errorCtrl.error('An error occurred loading posts.'); });
};

var postListView = function (ctrl) {
  var posts = ctrl.posts();
  
  return m('.posts.ui.column.list', [
    errorModule.view(ctrl.errorCtrl), 
    posts.map(function (post, index) {
      return m('article.post.item', [ 
        m('.content', [
          m('h2.title.header', post.title()),
          m('div.body', post.body()),
          m('div.date', 'Posted on ' + formatDate(post.date())),
          m('a[href=/edit/' + post.id() + ']', {config: m.route}, 'Edit Post')
        ])
      ]);
    })
  ]);
};

var postListModule = {
  controller: postListController,
  view: postListView
};