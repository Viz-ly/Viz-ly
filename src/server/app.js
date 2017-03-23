var express = require('express');
var path = require('path');
// var visionKey = require('./config/vision');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
// var visionKey = null;
// var configAuth = null;


var session = require('express-session');
var db = require('./db/db');
var User = db.User;
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// var configAuth = require('../client/env/config');


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


var gcloud = require('google-cloud')( {
  projectId: 'vizly-161619',
  key: process.env.VISION_API_KEY
});


//ROUTES GO HERE
var app = express();

app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(__dirname + '/../client'));
// app.get('/', function(req, res) {
//   res.send('Gary sux');
// });

passport.use(new FacebookStrategy({
  clientID: process.env.Facebook_clientID,
  clientSecret: process.env.Facebook_clientSecret,
  callbackURL: process.env.callbackURL
},
  function(accessToken, refreshToken, profile, done) {
    User.findOne({'facebook.id': profile.id}, function(err, user) {
      if (err) {
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
          facebook: profile._json,
          words: [],
          pics: JSON.stringify({})
        });
        console.log(user + 'veggies!');
        user.save(function(err) {
          if (err) { return done(err); }
          return done(err, user);
        });
      } else {
        //found user. Return
        console.log(user + 'veggies!');
        return done(null, user);
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
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' }));

var createObject = function(req, arrayStrings) {
  var arrayOfObj = [];
  var obj = {};
  console.log('req user words==========', req.user.words);
  for (var word = 0; word < arrayStrings.length; word++) {
    obj[arrayStrings[word]] ? obj[arrayStrings[word]]++ : obj[arrayStrings[word]] = 1;
  }
  for (var words in obj) {
    arrayOfObj.push({key: words, count: obj[words]});
  }
  return arrayOfObj;
};


app.get('/userLoggedIn', function(req, res) {
  console.log('---------------------------', req.user);
  // db.addFakeUser(req);
  // var arrayOfObj = [];
  if (req.user) {
    var arrayOfObj = createObject(req, req.user.words);
    res.send([req.user.name, arrayOfObj]);
  } else {
    res.send([undefined, []]);
  }
  // var arrayOfObj = createObject(req, req.user.words);
});


// app.get('/login', function(req,res) {
//   res.send('You are logged in!');
// });

//All get and post requests come here before middleware

// app.get('/testget', function(req, res) {
//   console.log('testget fired!');
//   db.handler(req);
// });

app.get('/testfind', function(req, res) {
  if (req.user) {
    console.log('user here!');
  }
  if (!req.user) {
    console.log('no user here');
  }
  console.log('testfind fired');
  db.User.find()
  .then(function (data) {
    console.log(data);
    res.json(data);
  });
});


app.use(fileUpload());


app.post('/upload', function(req, res) {
  // console.log('in upload!');
  console.log('files----------', req.files);
  // console.log('dataaaaaaaa', req.files.sampleFile.data.toString());
  if (!req.files) {
    res.status(400).send('No files were uploaded...');
  }

  var sampleFile = req.files.sampleFile;
  console.log('sample files---------', sampleFile);
  if (sampleFile.length === undefined) {
    sampleFile = [sampleFile];
  }

  var resultCount = 0;
  var vision = gcloud.vision({
    projectId: 'vizly-161619',
    keyFilename: __dirname + '/config/vizly.json'
  });

  // console.log('db words!!!', req.user.words);
  var arrayStrings = req.user.words;
  // var arrayStrings = [];
  var pics = JSON.parse(req.user.pics);

  var dups = 0;

  // var arrayStrings = [];

  for (var file = 0; file < sampleFile.length; file++) {
    console.log('sample file nameeeee', sampleFile[file].name);
    // if sample file name is in db
    if (pics[sampleFile[file].name]) {
      console.log('found duplicate!!*******************');

      /************UNCOMMENT DUPS AND CONTINUE BEFORE PUSHING********/
      dups++;
      continue;
    }
      //dups++
      //continue
    (function(file) {
      sampleFile[file].mv(__dirname + '/db/pics/pic' + file + '.jpg',function(err) {
        if (err) {
          res.status(500).send(err);
        }
        console.log('file---------', file);
        vision.detectLabels(__dirname + '/db/pics/pic' + file + '.jpg', function(err, result, apiResponse) {
          if (err) {
            // console.log('Error ', err);
            res.status(500).send(err);
          } else {
            resultCount++
            arrayStrings = arrayStrings.concat(result);
            pics[sampleFile[file].name] = true;
            console.log('result-------------', result);
            if ((resultCount + dups) === sampleFile.length) {
              // var arrayOfObj = [];
              // var obj = {};
              // console.log('req user words==========', req.user.words);
              // for (var word = 0; word < arrayStrings.length; word++) {
              //   obj[arrayStrings[word]] ? obj[arrayStrings[word]]++ : obj[arrayStrings[word]] = 1;
              // }
              // for (var words in obj) {
              //   arrayOfObj.push({key: words, count: obj[words]});
              // }
              var arrayOfObj = createObject(req, arrayStrings);
              console.log('req.user', req.user);
              User.findOne({'username': req.user.username}, function(err, user) {
                if (err) {
                  console.log('Error', err);
                }
                else if (!user) {
                  console.log('user not found');
                } else {
                  console.log('user found', user);
                  // console.log('hi baeeee', arrayOfObj);
                  user.words = arrayStrings;
                  //TO RESET DATABASE WORDS AND PICS, save empty array and object into db
                  // user.words = [];
                  user.pics = JSON.stringify(pics);
                  // user.pics = JSON.stringify({});
                  console.log('USER PICS', user.pics);
                  user.save(function(err) {
                    if (err) {
                      console.log('Error saving words', err);
                    } else {
                      console.log('Save word list success!')
                    }
                  });
                }
              })

              console.log('duplicates', dups);
              res.send([arrayOfObj, dups]);
            }
          }
        });
      });
    })(file);
  }
  if (sampleFile.length === dups) {
    var arrayOfObj = createObject(req, arrayStrings);
    res.send([arrayOfObj, dups]);
  }

});




module.exports = app;
