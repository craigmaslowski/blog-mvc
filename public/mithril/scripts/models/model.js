/* global validate */

function getPropertyOrDefault (prop, data, defaultValue) {
  defaultValue = defaultValue || '';
  return data && data[prop] ? data[prop] : defaultValue;
}

var Model = function (schema, constraints) {
	return function (data) {
		var self = this;
		
		Object.keys(schema).forEach(function (key) {
		  self[key] = m.prop(getPropertyOrDefault(key, data, schema[key]));	
		});
		
		self.constraints = constraints;
		self.toJSON = toJSON;
		self.validate = validateModel;
		self.validateProperty = validateProperty;	
	};
	
	function toJSON () {
	  var self = this;
	  return Object.keys(schema).reduce(function (acc, key) {
	    acc[key] = self[key]();
	    return acc;
	  }, {});
	}
	
	function validateModel () {
  	return validate(this.toJSON(), this.constraints);
	};
	
	function validateProperty (property) {
  	return validate.single(this[property](), this.constraints[property]);
	};
};