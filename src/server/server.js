var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db/db.js');

var app = express();

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/../client'));

app.listen(3000, function() {
  console.log('Server listening.  Go Vizly');
});

//For get/set routes go to routes.js
module.exports.app = app;

