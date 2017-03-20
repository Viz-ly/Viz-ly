var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('./db/db.js');
var User = db.User;
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('../client/env/config.js');


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var app = express();
//app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(__dirname + '/../client'));



passport.use(new FacebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL
},
  function(accessToken, refreshToken, profile, done) {
    User.findOne({'userName': profile.id}, function(err, user) {
      if (err) { 
        console.log(err);
        return done(err); 
      }
      //if no user was found, create a new user with values from Facebook
      if (!user) {
        console.log(profile);
        user = new User({
          name: profile.displayName,
          email: 'tbd',
          username: profile.userName || profile.id,
          provider: 'facebook',
          facebook: profile._json
        });
        console.log(user);
        user.save(function(err) {
          if (err) { console.log(err); }
          return done(err, user);
        });
      } else {
        //found user. Return
        return done(err, user);
      }
    });
  }
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.listen(3000, function() {
  console.log('Server listening.  Go Vizly');
});


