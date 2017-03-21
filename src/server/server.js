var app = require('./app.js');
var db = require('./db/db.js');


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


