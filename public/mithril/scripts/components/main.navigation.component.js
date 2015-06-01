/* global m */

var mainNavigationController = function (pageState) {
	var ctrl = this;
	
	ctrl.pageState = pageState;
	
	ctrl.logout = function () {
		users.logout().then(function () { 
			ctrl.pageState().authenticated(false);
			m.route('/'); 
		});
	};
};
	
var mainNavigationView = function (ctrl) {
	var links = [
		m('a.item[href="/"]', {config: m.route}, 'Home')
	];
	
	if (ctrl.pageState().authenticated()) {
		links.push(m('a.item[href="/add"]', {config: m.route}, [ m('i.write.icon') ], 'Add Post'));
		links.push(m('a.item[href="/register"]', {config: m.route}, [ m('i.add.user.icon') ], 'Add Author'));
		links.push(m('.right.menu', [ m('a.item[href="#"]', { onclick: ctrl.logout }, [ m('i.remove.icon') ], 'Logout') ]));
	}
	return m('nav.ui.inverted.menu', links);
};
	
var mainNavigationComponent = {
	controller: mainNavigationController,
	view: mainNavigationView 
};