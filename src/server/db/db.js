var mongoose = require('mongoose');
var mongodb = require('mongodb');

mongoose.Promise = Promise;

mongoURI = 'mongodb://localhost/vizly'; //this will be replaced with AWS address
mongoose.connect(mongoURI);

// // Run in seperate terminal window using 'mongod'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});

var Schema = mongoose.Schema({
  userName: String,
  email: String,
  picsUrl: String
});

var User = db.model('User', Schema);

module.exports.addFakeUser = function(request) {
  console.log('addFakeUser fired');
  var newInsert = new User({
    userName: 'mister mctester',
    email: 'arglebargle@freemail.com',
    picsUrl: 'TBD'
  });
  newInsert.save();
  console.log('db add user finish');
};

// module.exports.search = function(request) {
//   console.log('search fired');
//   User.findAll()
//     .then(
//   });
// }


module.exports.db = db;
module.exports.User = User;