/* global $ */
/* global errorComponent */
/* global m */
/* global users */

var userListController = function (pageState) {
  var ctrl = this;
  
  ctrl.pageState = pageState();
  
  if (!ctrl.pageState.authenticated()) 
    m.route('/restrictedAccess'); 
  
  ctrl.pageState.users = m.prop([]);
  
  ctrl.errorCtrl = new errorComponent.controller();
  
  ctrl.removeUser = function (e) {
    if (confirm('This action cannot be undone. Are you sure?')) {
      var data = $(e.currentTarget).data();
      Users.remove(data.userId).then(function () {
        // remove user from page data 
        ctrl.pageState.users(ctrl.pageState.users().without(function (user) {
          return user._id() == data.userId; 
        })); 
      }, ctrl.errorCtrl.error);
    }
  };
  
  Users.load().then(ctrl.pageState.users, function () { 
    ctrl.errorCtrl.error('An error occurred loading users.'); 
  });
};

var userListView = function (ctrl) {
  var users = ctrl.pageState.users();
  
  return m('.authors', [
    errorComponent.view(ctrl.errorCtrl),
    m('table.ui.padded.table', [
      m('thead', [ 
        m('tr', [
          m('th', 'Username'),
          m('th', 'Author Name'),
          m('th', '')
        ])
      ]),  
      m('tbody', [ 
        users.map(function (user, index) {
          return m('tr.user', [ 
            m('td.username', user.username()),
            m('td.fullName', user.firstName() + ' ' + user.lastName()),
            m('td.actions.right.aligned', [
              m('.ui.mini.primary.button', {'data-user-id': user._id(), onclick: ctrl.removeUser}, [ m('i.minus.icon') ], 'Remove')
            ])
          ]);
        })
      ])
    ])
  ]);
};

var userListComponent = {
  controller: userListController,
  view: userListView
};