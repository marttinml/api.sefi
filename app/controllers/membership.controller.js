var controller  = 'Membership';
var Membership  = require('../models/membership.model');
var Util        = require('../utils/log.util');
var MongoClient = require('mongodb').MongoClient;
var assert      = require('assert');
var ObjectId    = require('mongodb').ObjectID;
var url         = 'mongodb://usrsefi:passsefi@ds029814.mongolab.com:29814/sefi';


// Actions
exports.insert = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();

    Util.logStart({controller : 'Membership', method:'insert', d : d, body:req.body });

    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      Membership.insertDocument(db, req.body, function(result) {
          db.close();
          Util.logEnd({ start : start , response: result.ops});
          res.status(200).jsonp(result.ops);
      });
    });
};
exports.find = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();

    Util.logStart({controller : 'Membership', method:'find', d : d, body:req.body });

    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      Membership.findDocument(db, req.body || {}, function(result) {
          db.close();
          Util.logEnd({ start : start , response: result});
          res.status(200).jsonp(result);
      });
    });
};
exports.remove = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();

    Util.logStart({controller : 'Membership', method:'remove', d : d, body:req.body });

    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      Membership.removeDocument(db, req.body || {_id:'xd'}, function(result) {
          db.close();
          Util.logEnd({ start : start , response: result});
          res.status(200).jsonp(result);
      });
    });
};
exports.login = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();

    Util.logStart({controller : 'Membership', method:'find', d : d, body:req.body });

    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      var data = { user :req.body.user || '', password : req.body.password || '' };
      Membership.login(db, data, function(result) {
          db.close();
          Util.logEnd({ start : start , response: result});
          res.status(200).jsonp(result);
      });
    });
};