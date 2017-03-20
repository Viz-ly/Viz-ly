
var app = require('./server.js');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db/db.js');

//ROUTES GO HERE


// app.get('/testget', function(req, res) {
//   console.log('testget fired, calling addFakeUser');
//   db.addFakeUser(req);
//   res.end();
// });

//All get and post requests come here before middleware

// app.get('/testget', function(req, res) {
//   console.log('testget fired!');
//   db.handler(req);
// });

// app.get('/testfind', function(req, res) {
//   console.log('testfind fired');
//   db.User.count()
//   .then(function (data) {
//     console.log(data);
//   });
// });






