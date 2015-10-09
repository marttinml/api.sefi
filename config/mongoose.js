var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
//var mongoose = require('mongoose');

// DB connection - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = function(){
    //var db = mongoose.connect('mongodb://localhost/sefi', function (err, res) {
    //var db = mongoose.connect('mongodb://usrsefi:passsefi@ds029814.mongolab.com:29814/sefi', function (err, res) {
    
    var url = 'mongodb://usrsefi:passsefi@ds029814.mongolab.com:29814/sefi';
    //var url = 'mongodb://localhost/sefi';

    //var db = mongoose.connect('mongodb://ccles:Ccles13@ds051980.mongolab.com:51980/ccles', function(err, res) {
    MongoClient.connect(url, function(err, db) { 
        assert.equal(null, err);
        console.log("OK - - > Connected correctly to server.");
        db.close();
    });
};