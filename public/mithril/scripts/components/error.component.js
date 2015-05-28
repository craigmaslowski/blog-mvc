var errorController = function () {
	var ctrl = this;
	
	ctrl.clearError = function () {
		ctrl.error = m.prop('');
	};
	
	ctrl.clearError();	
};

var errorView = function (ctrl) {
	if (ctrl.error()) {
		return m('.ui.negative.message', [
	      m('i.close.icon', { onclick: ctrl.clearError }),
	      m('.header', 'Oops something went wrong!'),
	      m('p', ctrl.error().message)
	    ]);
	}
};

var errorComponent = { 
	controller: errorController,
	view: errorView
};