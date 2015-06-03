/* global Model */

var Post = new Model(
  { 
    _id: '',
    title: '',
    body: '',
    date: new Date(),
    ownerId: ''
  }, 
  { 
    title: { presence: {message: 'is required'} }, 
    body: { presence: {message: 'is required'} }
  }
);