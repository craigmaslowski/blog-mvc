var url = '/api/comments',
	comments = {
		save: function (model) {
	    model = model().toJSON();
	    
	    return request({
		    method: model._id ? 'PUT' : 'POST', 
		    url: url + '/' + (model._id ? model._id : ''), 
		    data: model 
		  });
	  },
		
	  remove: function (id) {    
		  return request({
	      method: 'DELETE', 
		    url: url + '/' + id 
		  });
	  },
		Model: Comment
	};
