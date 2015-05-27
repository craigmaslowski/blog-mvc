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

var UserModel = function (data) {
	this.username = m.prop('');	
	this.password = m.prop('');	
	this.confirmPassword = m.prop('');	
	this.toJSON = toJSON;
};

var users = {
	register: registerUser,
	login: loginUser,
	logout: logoutUser, 
	Model: UserModel	
};