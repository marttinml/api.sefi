module.exports = function(app) {

  var User = require('../models/user.js');



  findAllUsers = function(req, res) {
  	User.find(function(err, users) {
  		if(!err) {
  			res.send(users);
        console.log('Called: //  - - - - -  findAllUsers()');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };



  findByIdUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if(!err) {
        res.send(user);
        console.log('Called: //  - - - - -  findAllUsers()');
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  _findByNumber = function(number,fn){

     User.findOne({number:number}, function(err, user) {
      if(!err) {
        console.log('Called: //  - - - - -  _findByNumber()');
        fn(err,user);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  _findByNumbers = function(numbers,fn){

     User.find({ number:{ $in: numbers } }, function(err, users) {
      if(!err) {
        console.log('Called: //  - - - - -  _findByNumbers()');
        fn(err,users);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };



  addUser = function(req, res) {

    var user = new User({
      number:     req.body.number,
      name:       req.body.name,
      lastname:   req.body.lastname,
      img:        req.body.img,
      password:   req.body.password,
      contacts:   req.body.contacts
    });

    user.save(function(err) {
      if(!err) {
        console.log('Called: //  - - - - -  addUser()');
      } else {
        console.log('ERROR: ' + err);
      }
    });

    res.send(user);
  };




  getSesion = function(req, res){
    
    _findByNumber(req.params.number,function(err,user){

      var sesion = {};
          sesion.user = user;

          if(sesion.user){
            
           var contacts = sesion.user.contacts;

           if(contacts){
              
              var numbers = [];
              for(var i = 0 ; i < contacts.length ; i++){
                numbers.push(contacts[i].number);
              }

              _findByNumbers(numbers,function(err,users){
                sesion.contacts = users;
                res.send(sesion);
              });

           }else{
            res.send(sesion);
           }
        }else{
          res.send("No se encontro usuario Registdo con el numero: "+req.params.number); 
        }
      
    });

    

    //res.send(sesion);
  };


  login = function(req, res){

    console.log(req.body);

     User.find({ number:req.body.user,password:req.body.pass }, function(err, users) {
      if(users.length) {
        console.log('Called: //  - - - - -  login()');
        console.log(users);
        res.send(true);
      } else {
        console.log('ERROR: ' + err);
        res.send(false);
      }
    });
  };

/*


{
  "number":"5567087001",
  "name":"Martín",
  "contacts":[]
}

*/
  app.get('/',function(req, res){
    res.send(':)');
  });
  app.get('/users', findAllUsers);
  app.get('/user/:id', findByIdUser);
  app.post('/adduser', addUser);
  app.get('/getsesion/:number', getSesion);
  app.post('/login', login);
}