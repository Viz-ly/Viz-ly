var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = require('./server.js');
var db = require('./db/db.js');

//ROUTES GO HERE
var app = express();

app.use(bodyParser.json());

// app.use('/', express.static(__dirname + '/../client'));
app.get('/', function(req, res) {
  res.send('Hello Viz.ly!');
});

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





module.exports = app;
