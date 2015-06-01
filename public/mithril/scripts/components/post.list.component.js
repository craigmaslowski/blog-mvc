/* global mainNavigationComponent */
/* global mixinLayout */
/* global layoutComponent */
/* global errorComponent */
/* global formatDate */
/* global m */
/* global posts */

var postListController = function (pageState) {
  var ctrl = this;
  ctrl.pageState = pageState;
  ctrl.pageState().posts = m.prop([]);
  ctrl.errorCtrl = new errorComponent.controller();
  posts.load().then(ctrl.pageState().posts, function () { 
    ctrl.errorCtrl.error('An error occurred loading posts.'); 
  });
};

var postListView = function (ctrl) {
  var posts = ctrl.pageState().posts();
  
  return m('.posts.ui.column.list', [
    errorComponent.view(ctrl.errorCtrl), 
    posts.map(function (post, index) {
      var postElements = [
          m('a[href=/post/' + post.id() + ']', {config: m.route}, [ m('h2.title.header', post.title()) ]),
          m('.body', m.trust(marked(post.body()))),
          m('.meta', 'Posted on ' + formatDate(post.date()))
      ];
      
      if (ctrl.pageState().authenticated()) {
        postElements.push(m('.actions', [
          m('a[href=/edit/' + post.id() + ']', {config: m.route}, 'Edit Post')
        ]));
      }
      
      postElements.push(m('.ui.divider'));
      
      return m('article.post.item', [ 
        m('.content', postElements)
      ]);
    })
  ]);
};

var postListComponent = {
  controller: postListController,
  view: postListView
};