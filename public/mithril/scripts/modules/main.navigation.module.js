/* global m */

var mainNavigationController = function () {
	var ctrl = this;
	
	ctrl.logout = function () {
		users.logout().then(function () { m.route('/'); });
	};
};
	
var mainNavigationView = function (ctrl) {
	return m('nav.ui.inverted.menu', [
		m('a.item[href="/"]', {config: m.route}, 'Home'),
		m('a.item[href="/add"]', {config: m.route}, 'Add Post'),
		m('a.item[href="/register"]', {config: m.route}, 'Register'),
		m('a.item[href="/login"]', {config: m.route}, 'Login'),
		m('a.item[href="#"]', { onclick: ctrl.logout }, 'Logout')
	]);
};
	
var mainNavigationModule = {
	controller: mainNavigationController,
	view: mainNavigationView 
};