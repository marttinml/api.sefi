var MongoClient = require('mongodb').MongoClient
//var mongoose = require('mongoose');

// DB connection - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = function(){
    //var db = mongoose.connect('mongodb://localhost/sefi', function (err, res) {
    //var db = mongoose.connect('mongodb://usrsefi:passsefi@ds029814.mongolab.com:29814/sefi', function (err, res) {
    var url = 'mongodb://usrsefi:passsefi@ds029814.mongolab.com:29814/sefi';
    //var db = mongoose.connect('mongodb://ccles:Ccles13@ds051980.mongolab.com:51980/ccles', function(err, res) {
    var db = MongoClient.connect(url, function(err, db) { 
        if (err) {
            console.log('ERROR: connecting to Database... ' + err);
        } else {
            console.log('Connected to Database');
        }
    });
    require('../app/models/membership.model');
    return db;
};