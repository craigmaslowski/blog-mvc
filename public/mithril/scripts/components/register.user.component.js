/* global m */
/* global errorComponent */
/* global users */

var registerUserController = function (pageState) {
	var ctrl = this;
  
  ctrl.pageState = pageState();

  if (!ctrl.pageState.authenticated()) 
    m.route('/restrictedAccess'); 
  
  ctrl.pageState.user = m.prop(new users.Model());
  ctrl.pageState.validationErrors = m.prop({});

  ctrl.errorCtrl = new errorComponent.controller();
  
  ctrl.register = function () {
    var user = ctrl.pageState.user,
        validationErrors = user().validate();
    
    if (validationErrors) {
      ctrl.pageState.validationErrors(validationErrors);
      return;
    }
    
    users.register(user).then(function () { m.route('/'); }, ctrl.errorCtrl.error);
  };
};

var registerUserView = function (ctrl) {
  var user = ctrl.pageState.user(),
      validationErrors = ctrl.pageState.validationErrors();
  
	// build the form
  var form = [
    m('h4.ui.dividing.header', 'Add Author'),
    m('.username.field' + (validationErrors.username ? '.error' : ''), [
      m('label', 'Username'),
      m('input[type=text][placeholder=Username]', { 
        oninput: m.withAttr('value', user.username),
        config: initializePopup,      
        'data-popup-message': validationErrors.username 
          ? validationErrors.username.join('<br/>') 
          : 'Enter the author\'s username here' 
      })
    ]),
    m('.firstName.field' + (validationErrors.firstName ? '.error' : ''), [
      m('label', 'First Name'),
      m('input[type=text][placeholder="First Name"]', { 
        oninput: m.withAttr('value', user.firstName),
        config: initializePopup,      
        'data-popup-message': validationErrors.firstName 
          ? validationErrors.firstName.join('<br/>') 
          : 'Enter the author\'s first name here'  
      })  
    ]),
    m('.lastName.field' + (validationErrors.lastName ? '.error' : ''), [
      m('label', 'Last Name'),
      m('input[type=text][placeholder="Last Name"]', { 
        oninput: m.withAttr('value', user.lastName),
        config: initializePopup,
        'data-popup-message': validationErrors.lastName 
          ? validationErrors.lastName.join('<br/>') 
          : 'Enter the author\'s last name here'   
      })  
    ]),
    m('.password.field' + (validationErrors.password ? '.error' : ''), [
      m('label', 'Password'),
      m('input[type=password][placeholder=Password]', { 
        oninput: m.withAttr('value', user.password),
        config: initializePopup,
        'data-popup-message': validationErrors.password 
          ? validationErrors.password.join('<br/>') 
          : 'Enter the author\'s password here'
      })
    ]),
    m('.confirmPassword.field' + (validationErrors.confirmPassword ? '.error' : ''), [
      m('label', 'Confirm Password'),
      m('input[type=password][placeholder="Confirm Password"]', { 
        oninput: m.withAttr('value', user.confirmPassword),
        config: initializePopup,
        'data-popup-message': validationErrors.confirmPassword 
          ? validationErrors.confirmPassword.join('<br/>') 
          : 'Confirm the author\'s password here' 
      })
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