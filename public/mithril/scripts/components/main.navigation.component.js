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
	
	if (ctrl.pageState().authenticated())
		links.push(m('a.item[href="/add"]', {config: m.route}, 'Add Post'));
	
	return m('nav.ui.inverted.menu', links.concat(getAuthenticationLinks()));
	
	function getAuthenticationLinks() {
		if (ctrl.pageState().authenticated()) {
			return [ m('.right.menu', [ m('a.item[href="#"]', { onclick: ctrl.logout }, 'Logout') ])]; 
		} else {
			return [ m('.right.menu', [
				m('a.item[href="/register"]', {config: m.route}, 'Register'),
				m('a.item[href="/login"]', {config: m.route}, 'Login')
			])];
		}	
	}
};
	
var mainNavigationComponent = {
	controller: mainNavigationController,
	view: mainNavigationView 
};