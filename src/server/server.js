var app = require('./app.js');
var db = require('./db/db.js');


app.listen(3000, function() {
  console.log('Server listening.  Go Vizly');
});


// app.get('/testget', function(req, res) {
//   console.log('testget fired, calling addFakeUser');
//   db.addFakeUser(req);
//   res.end();
// });

//For get/set routes go to routes.js


