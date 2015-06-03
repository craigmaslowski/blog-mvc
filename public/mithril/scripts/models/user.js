/* global Model */

var User = new Model(
  { 
    _id: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  }, 
  { 
    username: { presence: true }, 
    firstName: { presence: true },
    lastName: { presence: true },
    password: { presence: true },
    confirmPassword: { 
      presence: true,
      equality: 'password' 
    }
  }
);