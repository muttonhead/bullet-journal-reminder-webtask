var parallel = require('async').parallel;
var MongoClient = require('mongodb').MongoClient;
var uuid = require('node-uuid');

module.exports = function (context, cb) {
  console.log(context);
  var title = context.body.title;
  var starts = context.body.starts;
  
  MongoClient.connect(context.data.SECRET, function (err, db) {
    if (err) return cb('Error');
    
    var obj = {
      title: title,
      starts: starts,
      id: uuid.v4()
    }
    var col = db.collection('new_events');
    col.insertOne(obj, function(err, r) {
      if (err) return cb('Error');
      else {
        db.close();
        return cb(null, 'Complete');
      }
    });
  });
}