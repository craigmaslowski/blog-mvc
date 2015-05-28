/* global m */
/* global errorComponent */
/* global users */

var registerUserController = function () {
	var ctrl = this;
  ctrl.user = m.prop(new users.Model());
  ctrl.errorCtrl = new errorComponent.controller();
  
  ctrl.register = function () {
    if (ctrl.user().password() !== ctrl.user().confirmPassword()) {
      return; ctrl.errorCtrl.error('Passwords do not match.');
    }
    
    users.register(ctrl.user).then(function () { m.route('/'); }, ctrl.errorCtrl.error);
  };
};

var registerUserView = function (ctrl) {
  var user = ctrl.user();
  
	// build the form
  var form = [
    m('h4.ui.dividing.header', 'Register'),
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
    m('.field', [
      m('label', 'Confirm Password'),
      m('input[type=password][placeholder="Confirm Password"]',
        { oninput: m.withAttr('value', user.confirmPassword) })
    ]),
    m('button[type=button].ui.primary.button', { onclick: ctrl.register, href: '#' }, 'Register')
  ];
  
  // return the form
  return m('.ui.two.column.centered.grid', [ m('form.ui.form.post-form.column', [ errorComponent.view(ctrl.errorCtrl), form ])]);
};

var registerUserComponent = {
	controller: registerUserController,
	view: registerUserView
};