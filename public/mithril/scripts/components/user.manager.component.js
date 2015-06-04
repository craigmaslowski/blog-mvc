/* global m */

var userManagerController = function (pageState) {
		var ctrl = this;
		
		ctrl.pageState = pageState();
		ctrl.pageState.showRegisterForm = m.prop(false);
		ctrl.userListController = new userListComponent.controller(pageState);	
		ctrl.registerUserController = new registerUserComponent.controller(pageState);
		
		ctrl.toggleUserForm = function () {
			ctrl.pageState.showRegisterForm(!ctrl.pageState.showRegisterForm());
		};
};

var userManagerView = function (ctrl) {
	var els = [
		m('h1', 'Authors'),
		m('button.add.user.ui.primary.button', {onclick: ctrl.toggleUserForm}, [m('i.add.icon')], 'Add User')
	];

	if (ctrl.pageState.showRegisterForm())		
		els.push(m('.ui.segment', [ registerUserComponent.view(ctrl.registerUserController) ]))
		
	els.push(userListComponent.view(ctrl.userListController));
	return m('.author.manager.column', els); 
};

var userManagerComponent = {
	controller: userManagerController,
	view: userManagerView
};
