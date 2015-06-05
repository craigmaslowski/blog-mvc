/// <reference path="typings/node/node.d.ts"/>

var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    spaRoute = require('./routes/spa'),    
    apiRoutes = require('./routes/api'),
		User = require('./models/user'),
    app = express(),
    port = process.env.PORT || 3000;
    
// establish db connection
mongoose.connect('mongodb://localhost:27017/blog');

// middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'oh so many secrets!', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));;
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) { 
  res.header('Access-Control-Allow-Credentials', 'true'); 
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  next(); 
});

// route setup
app.use(spaRoute); // middleware to serve our SPA's index page
app.use('/api', apiRoutes); // routes to all api actions
app.use(express.static(path.join(__dirname, 'public'))); // static file serving for css, js, etc.

User.find({}, function (err, users) {
  if (users.length === 0) {
    console.log('No users found');
    User.register(new User({ 
      username: 'craig', 
      firstName: 'Craig', 
      lastName: 'Maslowski' 
    }), 
    'secret', 
    function (err) {
      if (err) throw new Error(err);
      console.log('Default user created');
    });
  }
});

// start server
app.listen(port);
console.log('Listening on port ' + port);
