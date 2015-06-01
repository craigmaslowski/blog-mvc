var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose')

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: 'String',
  firstName: {
    type: String,
    required: true 
  },
  lastName: {
    type: String,
    required: true 
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);