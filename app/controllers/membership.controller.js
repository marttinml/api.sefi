var Membership   = require('mongoose').model('Membership'),
    response  = {},
    start     = 0,
    end       = 0;

exports.create = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    and   = 0;

    console.log('\nuser.controller > create()');
    console.log('············································································'+d);
    console.log('   D A T A B A S E');
    console.log('Schema:  Membership.create()');
    console.log('>>> Data Request');
    console.log(req.body);

    var membership = new Membership({
        user 		    : req.body.user,
        password 	    : req.body.password,
        name 	        : req.body.name,
        status          : req.body.status,
        isConnected     : req.body.isConnected,
        lastConnection   : req.body.lastConnection,
        date 		    : d
    });

    membership.save(function (err) {

        response = !err ? membership : err;

        console.log('\n<<< Data Response');
        console.log(membership);
        d   = new Date()
        end = d.getMilliseconds();
        console.log('············································································ Time: '+(end-start)+' ms');
        
        res.send(response);
    });
    
};




exports.update = function(req, res){
    
    var d   = new Date();
    start   = d.getMilliseconds();
    and   = 0;

    console.log('\nuser.controller > create()');
    console.log('············································································'+d);
    console.log('   D A T A B A S E');
    console.log('Schema:  Membership.create()');
    console.log('>>> Data Request');
    console.log(req.body);

    Membership.update(
        { _id: req.body._id },
        {$set:
            {
                user            : req.body.user,
                password        : req.body.password,
                name            : req.body.name,
                status          : req.body.status,
                isConnected     : req.body.isConnected,
                lastConnection   : req.body.lastConnection
            }
        },
        function(err){
            response = !err ? req.body : err;

            console.log('\n<<< Data Response');
            console.log(response);
            d   = new Date()
            end = d.getMilliseconds();
            console.log('············································································ Time: '+(end-start)+' ms');
        
            res.send(response);
        }
    );

};


exports.retrieve = function(req, res) {
  	Membership.find(function(err, memberships) {
  		if(!err) {
  			res.send(memberships);
        console.log('Called: ·························· retrieve()');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

exports.find = function(req, res) {
    Membership.find({_id: req.body._id  }, function(err, membership) {
        if(!err) {
            res.send(membership);
            console.log('Called: ·························· login()');
        } else {
            console.log('ERROR: ' + err);
        }
    });
  };


exports.login = function(req, res) {
    Membership.find({user : req.body.user, password : req.body.password  }, function(err, memberships) {
        if(!err) {
            //memberships = memberships.length > 0 ? true : false
            res.send(memberships);
            console.log('Called: ·························· login()');
        } else {
            console.log('ERROR: ' + err);
        }
    });
  };





  exports.test = function(req, res) {
    res.send({obj:"Gelow"});
  };

