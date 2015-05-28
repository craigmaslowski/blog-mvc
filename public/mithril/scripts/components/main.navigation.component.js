/* global m */
 


var mainNavigationController = function (data) {
	var ctrl = this;
	
	data = data || {};
	ctrl.isAuthenticated = m.prop(data.authenticated || false);
	
	if (!ctrl.isAuthenticated())
		users.loggedIn().then(ctrl.isAuthenticated); 
	
	ctrl.logout = function () {
		users.logout().then(function () { 
			ctrl.isAuthenticated(false);
			m.route('/'); 
		});
	};
	
	function ViewState(data) {
		this.authenticated = m.prop(getPropertyOrDefault('authenticated', data));	
	}
};
	
var mainNavigationView = function (ctrl) {
	var links = [
		m('a.item[href="/"]', {config: m.route}, 'Home'),
		m('a.item[href="/add"]', {config: m.route}, 'Add Post')
	];
	
	return m('nav.ui.inverted.menu', links.concat(getAuthenticationLinks()));
	
	function getAuthenticationLinks() {
		if (ctrl.isAuthenticated()) {
			return [ m('a.item[href="#"]', { onclick: ctrl.logout }, 'Logout') ]; 
		} else {
			return [
				m('a.item[href="/register"]', {config: m.route}, 'Register'),
				m('a.item[href="/login"]', {config: m.route}, 'Login')
			];
		}	
	}
};
	
var mainNavigationComponent = {
	controller: Observable.register([events.login], mainNavigationController),
	view: mainNavigationView 
};