var controller  = 'Sefi';
var Membership  = require('../models/membership.model');
var Util        = require('../utils/log.util');
var MongoClient = require('mongodb').MongoClient;
var assert      = require('assert');
var ObjectId    = require('mongodb').ObjectID;
var url         = 'mongodb://usrsefi:passsefi@ds029814.mongolab.com:29814/sefi';
var obj = {success:false,data:'',description:''};

var $scope = {};
    
    var getID = function(){
        var id = $scope.baseAddress.section;
        var sectionLength = 13 - $scope.baseAddress.section.length;

        for(var i = 0; i < sectionLength; i++){
            id += Math.floor((Math.random() * 9) + 1);
        }
        
        return id;
    };

    var getSecondCons = function(word){
        var wordLength = word.length;

        for(var i = 1; i < wordLength; i++){
            var character = word.substring(i, (i + 1));
            if(character != 'A' && character != 'E' && character != 'I' && character != 'O' && character != 'U' ){
                return character;
            }
        }
        return 'ERROR: Appellido Invalido';
    };


    var getSecondVoc = function(word){
        var wordLength = word.length;

        for(var i = 1; i < wordLength; i++){
            var character = word.substring(i, (i + 1));
            if(character == 'A' || character == 'E' || character == 'I' || character == 'O' || character == 'U' ){
                return character;
            }
        }
        return 'ERROR: Appellido Invalido';
    };

    var prepareString = function(){
                
                $scope.baseAddress.state   = JSON.parse($scope.baseAddress.state);
                $scope  .sex                 = JSON.parse($scope.sex);

                $scope.nameUp = $scope.name.toUpperCase();
                $scope.lastNameUp = $scope.lastName.toUpperCase();
                $scope.name = $scope.name.toUpperCase();
                $scope.street = $scope.street.toUpperCase()
                $scope.baseAddress.local = $scope.baseAddress.local.toUpperCase();
                $scope.baseAddress.del = $scope.baseAddress.del.toUpperCase();

                $scope.lastNameUp = $scope.lastNameUp.trim()
                var n = $scope.lastNameUp.indexOf(" ");
                $scope.lastName1 = $scope.lastNameUp.substring(0,n)
                $scope.lastName2 = $scope.lastNameUp.substring(n+1,$scope.lastNameUp.length)

            };

    var getCURP = function(){
        var curp = "";

        curp += $scope.lastName1.substring(0,1);
        curp += getSecondVoc($scope.lastName1)
        curp += $scope.lastName2.substring(0,1);
        curp += $scope.name.substring(0,1);
        curp += $scope.birthdate.year;
        curp += $scope.birthdate.month;
        curp += $scope.birthdate.day;
        curp += $scope.sex.id;
        curp += $scope.baseAddress.state.id;
        curp += getSecondCons($scope.lastName1);
        curp += getSecondCons($scope.lastName2);
        curp += getSecondCons($scope.nameUp);
        curp += "0"+ Math.floor((Math.random() * 9) + 1);

        return curp.toUpperCase();
    };

    var getFolioIFE = function(){
        var folioIFE = "";

        folioIFE += $scope.lastName1.substring(0,1);
        folioIFE += $scope.lastName1.substring(2,3);
        folioIFE += $scope.lastName2.substring(0,1);
        folioIFE += $scope.lastName2.substring(2,3);
        folioIFE += $scope.name.substring(0,1);
        folioIFE += $scope.name.substring(2,3);
        folioIFE += $scope.birthdate.year;
        folioIFE += $scope.birthdate.month;
        folioIFE += $scope.birthdate.day;
        folioIFE += $scope.baseAddress.state.no;
        folioIFE += $scope.sex.id;
        folioIFE += Math.floor((Math.random() * 9) + 1) + ""+
                    Math.floor((Math.random() * 9) + 1) + ""+
                    Math.floor((Math.random() * 9) + 1);

        return folioIFE.toUpperCase();
    };

    var getFolio = function(){
        var folio = "";
        folio += "000" +
        Math.floor((Math.random() * 9) + 1) + ""+
        Math.floor((Math.random() * 9) + 1) + ""+
        Math.floor((Math.random() * 9) + 1) + ""+
        Math.floor((Math.random() * 9) + 1) + ""+
        Math.floor((Math.random() * 9) + 1) + ""+
        Math.floor((Math.random() * 9) + 1) + ""+
        Math.floor((Math.random() * 9) + 1) + ""+
        Math.floor((Math.random() * 9) + 1) + ""+
        Math.floor((Math.random() * 9) + 1) + ""+
        Math.floor((Math.random() * 9) + 1);

        return folio;
        };


exports.build = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    and   = 0;
    data  = {};

    console.log('\nuser.controller > create()');
    console.log('············································································'+d);
    console.log('   D A T A B A S E');
    console.log('Schema:  sefi.build()');
    console.log('>>> Data Request');
    console.log(req.body);
    
    $scope = req.body;
    prepareString();

    data.name        = $scope.name;
    data.lastName1   = $scope.lastName1;
    data.lastName2   = $scope.lastName2;
    data.birthdate   = $scope.birthdate.day + '/' + $scope.birthdate.month + '/'+$scope.birthdate.year;
    data.old         = $scope.old;
    data.registerYear= $scope.registerYear + ' 00';
    data.no          = $scope.baseAddress.state.no;
    data.local       = $scope.baseAddress.local;
    data.del         = $scope.baseAddress.del;
    data.localN      = $scope.baseAddress.localN;
    data.delN        = $scope.baseAddress.delN;
    data.cp          = $scope.baseAddress.cp;
    data.section     = $scope.baseAddress.section;
    
    data.sex         = $scope.sex.id;
    data.sign        = '/sefi/assets/img/'+Math.floor((Math.random() * 2) + 1) + '.png';

    data.address1    = $scope.street;
    data.address2    = $scope.baseAddress.local + ' \t ' + $scope.baseAddress.cp;
    data.address3    = $scope.baseAddress.del+', '+$scope.baseAddress.state.id+'.';

    data.curp     = getCURP();
    data.folioIFE = getFolioIFE();
    data.folio    = getFolio();
    data.ID       = getID();

    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      Membership.checkToken(db, req.body.user, function(result) {
          
          if(result){
            Util.logEnd({ start : start , response: result.ops});
            res.status(200).jsonp(data);
          }else{
            res.status(200).jsonp(obj);
          }
          
      });
    });

    
};




    