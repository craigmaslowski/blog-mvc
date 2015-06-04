/* global toJSON */
/* global m */
/* global request */

var registerUser = function (user) {
	return request({ method: 'POST', url: '/api/register', data: user().toJSON() });
};

var loginUser = function (user) {
	return request({ method: 'POST', url: '/api/login', data: user().toJSON() });
};

var logoutUser = function (user) {
	return request({ method: 'GET', url: '/api/logout' });
};

var loggedIn = function (user) {
	return request({ method: 'GET', url: '/api/loggedin' });
};

var Users = new Resource({
	url: '/api/users',
	Model: User
});

Users.register = registerUser;
Users.login = loginUser;
Users.logout = logoutUser;
Users.loggedIn = loggedIn;