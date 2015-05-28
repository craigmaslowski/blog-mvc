/* global mainNavigationComponent */
/* global mixinLayout */
/* global layoutComponent */
/* global errorComponent */
/* global formatDate */
/* global m */
/* global posts */

var postListController = function () {
  var ctrl = this;
  ctrl.posts = m.prop([]);
  ctrl.errorCtrl = new errorComponent.controller();
  posts.load().then(ctrl.posts, function () { ctrl.errorCtrl.error('An error occurred loading posts.'); });
};

var postListView = function (ctrl) {
  var posts = ctrl.posts();
  
  return m('.posts.ui.column.list', [
    errorComponent.view(ctrl.errorCtrl), 
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

var postListComponent = {
  controller: postListController,
  view: postListView
};