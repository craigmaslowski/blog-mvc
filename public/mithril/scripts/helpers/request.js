/* global m */

var xhrConfig = function (xhr) {
	xhr.withCredentials = true;
};

var request = function (options) {
	options.config = xhrConfig;
	return m.request(options);
};