var app = require('./app.js');
var db = require('./db/db.js');
var fileUpload = require('express-fileUpload');
var Vision = require('@google-cloud/vision');
var google = require('googleapis');
var GoogleAuth = require('google-auth-library');


var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server listening on ' + port + '.  Go Vizly');
});



// app.get('/testget', function(req, res) {
//   console.log('testget fired, calling addFakeUser');
//   db.addFakeUser(req);
//   res.end();
// });

//For get/set routes go to routes.js



app.listen(3000, function() {
  console.log('Server listening.  Go Vizly');
});

