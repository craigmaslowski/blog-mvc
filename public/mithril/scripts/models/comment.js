/* global Model */

var Comment = new Model(
  { 
    _id: '',
    author: '',
    body: '',
    date: new Date(),
    postId: ''
  }, 
  { 
    author: { presence: {message: 'is required'} }, 
    body: { presence: {message: 'is required'} }
  }
);