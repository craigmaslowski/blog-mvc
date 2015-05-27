/* global m */
/* global request */

function Resource (options) {
  var self = this;
  self.url = options.url;
  self.Model = options.Model;
	
  self.load = function (id) {
	  return request({
	    method: 'GET', 
	    url: self.url + '/' + (id || ''), 
	    type: self.Model 
	  });
  };

  self.save = function (model) {
    model = model().toJSON();
    
    return request({
	    method: model.id ? 'PUT' : 'POST', 
	    url: self.url + '/' + (model.id ? model.id : ''), 
	    data: model 
	  });
  };
	
  self.remove = function (id) {    
	  return request({
      method: 'DELETE', 
	    url: self.url + '/' + id 
	  });
  };
}