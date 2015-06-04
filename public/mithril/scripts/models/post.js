/* global Model */

var Post = new Model(
  { 
    _id: '',
    title: '',
    body: '',
    date: new Date(),
    comments: [],
    author: ''
  }, 
  { 
    title: { presence: {message: 'is required'} }, 
    body: { presence: {message: 'is required'} }
  }
);