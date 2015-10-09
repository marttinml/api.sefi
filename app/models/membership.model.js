var assert = require('assert');

exports.insertDocument = function(db, data, callback) {
   db.collection('membership').insertOne( {
        user            : data.user,
        password        : data.password,
        name            : data.name,
        status          : data.status,
        isConnected     : data.isConnected,
        lastConnection  : data.lastConnection,
        date            : data.d,
        profile         : data.profile
    }, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
};

exports.findDocument = function(db, data, callback) {
    var result = [];
   var cursor = db.collection('membership').find(data);
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         result.push(doc);
      } else {
         callback(result);
      }
   });
};

exports.removeDocument = function(db, data, callback) {
   db.collection('membership').deleteMany(
      data,
      function(err, results) {
         callback(results);
      }
   );
};


exports.login = function(db, data, callback) {
    var result = false;
   var cursor = db.collection('membership').find(data);
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         result = true;
      } else {
         callback(result);
      }
   });
};