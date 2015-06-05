var PageState = function (data) {
	data = data || {};
	this.authenticated = m.prop(getPropertyOrDefault('authenticated', data));
};

var Page = function (navigation, content) {
	this.controller = function (pageState) {
		var ctrl = this;
		
		ctrl.pageState = m.prop(pageState || new PageState());
				
		if (!ctrl.pageState().authenticated()) {
			Users.loggedIn()
				.then(ctrl.pageState().authenticated)
				.then(function () {
					ctrl.navigationCtrl = new navigation.controller(ctrl.pageState);
					ctrl.contentCtrl = new content.controller(ctrl.pageState);
				});
		} else {
			ctrl.navigationCtrl = new navigation.controller(ctrl.pageState);
			ctrl.contentCtrl = new content.controller(ctrl.pageState);
		}
			
	};
	
	this.view = function (ctrl) {
		return [
			m('header.main', [ navigation.view(ctrl.navigationCtrl) ]),
	  	m('section.main.ui.page.grid', [ content.view(ctrl.contentCtrl) ])
		];
	};
};