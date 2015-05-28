/* global Observable */
/* global m */
/* global errorComponent */
/* global users */

var loginUserController = function () {
	var ctrl = this;
  ctrl.user = m.prop(new users.Model());
  ctrl.errorCtrl = new errorComponent.controller();
  
  ctrl.login = function () {
    users.login(ctrl.user).then(function () {
      Observable.trigger(events.login, {authenticated: true});
      m.route('/'); 
    }, ctrl.errorCtrl.error);
  };
};

var loginUserView = function (ctrl) {
  var user = ctrl.user();
  
	// build the form
  var form = [
    m('h4.ui.dividing.header', 'Login'),
    m('.field', [
      m('label', 'Username'),
      m('input[type=text][placeholder=Username]', 
        { oninput: m.withAttr('value', user.username) })  
    ]),
    m('.field', [
      m('label', 'Password'),
      m('input[type=password][placeholder=Password]',
        { oninput: m.withAttr('value', user.password) })
    ]),
    m('button[type=button].ui.primary.button', { onclick: ctrl.login, href: '#' }, 'Login')
  ];
  
  // return the form
  return m('.ui.two.column.centered.grid', [ m('form.ui.form.post-form.column', [ errorComponent.view(ctrl.errorCtrl), form ])]);
};

var loginUserComponent = {
	controller: loginUserController,
	view: loginUserView
};