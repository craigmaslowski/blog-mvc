var restrictedAccessController = function (pageState) {
	var ctrl = this;
	
	ctrl.pageState = pageState;
	ctrl.loginUserCtrl = new loginUserComponent.controller(ctrl.pageState);
	ctrl.loginUserCtrl.errorCtrl.error({ message: 'You are not authorized to perform that action. Are you logged in?' });
};

var restrictedAccessView = function (ctrl) {
	return [
		loginUserView(ctrl.loginUserCtrl)
	];
};

var restrictedAccessComponent = {
	controller: restrictedAccessController,
	view: restrictedAccessView
};