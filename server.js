
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db.js');


var app = express();


app.use(bodyParser.json());



app.listen(3000, function() {
  console.log('Server listening.  Go Vizly');
  console.log(__dirname);
});

app.use(express.static(__dirname + '/public'));


app.get('/testget', function(req, res) {
  console.log('testget fired!')
  db.handler(req);
});

app.get('/testfind', function(req, res) {
  console.log('testfind fired')
  db.User.count()
  .then(function (data) {
    console.log(data);
});




