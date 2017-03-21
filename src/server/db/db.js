
var mongoose = require('mongoose');
var mongodb = require('mongodb');
///
mongoose.Promise = Promise;

mongoURI = 'mongodb://TeamVizly:123456789teamVIZLY@cluster0-shard-00-00-zblxo.mongodb.net:27017,cluster0-shard-00-01-zblxo.mongodb.net:27017,cluster0-shard-00-02-zblxo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';



mongoose.connect(mongoURI);



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});

var Schema = mongoose.Schema({
  name: String,
  email: String,
  username: String,
  provider: String,
  facebook: Object,
  pics: Array
});


var User = db.model('User', Schema);


//this test can get moved later
module.exports.addFakeUser = function(request) {
  console.log('addFakeUser fired');
  var newInsert = new User({
    name: 'mister mctester',
    email: 'arglebargle@freemail.com',
    username: 'mrMcT2003',
    provider: '',
    facebook: {},
    pics: []
  });
  newInsert.save();
  console.log('db add user finish');
};


// // module.exports.search = function(request) {
// //   console.log('search fired');
// //   User.findAll()
// //     .then(
// //   });
// // }


module.exports.db = db;
module.exports.User = User;