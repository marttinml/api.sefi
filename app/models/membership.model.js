var assert = require('assert');

exports.insertDocument = function(db, data, callback) {
   db.collection('membership').insertOne( {
        user            : data.user,
        password        : data.password,
        name            : data.name,
        status          : data.status,
        session         : data.session,
        profile         : data.profile,
        date            : new Date(),
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


exports.insertToken = function(db, data, callback) {
  var where = { user : data.user, password : data.password };
   db.collection('membership').updateOne(
      where,
      {
        $set: { "session.token": data.token },
        $currentDate: { "lastModified": true }
      }, function(err, results) {

        exports.findDocument(db, where, function(result){
          callback(result[0]);
        })
      
   });
};

exports.checkToken = function(db, data, callback) {
  var where = { user : data.user, password : data.password };

        exports.findDocument(db, where, function(result){
          db.close();
          var endResult = result[0].session.token == data.session.token ? true : false;
          callback(endResult);
        });
};
