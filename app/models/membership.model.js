var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;

var membership = new Schema({
	user 			: { type : String },
	password  		: { type : String },
	name 			: { type : String },
	status 			: { type : Number },
	isConnected 	: { type : Boolean },
	lastConnection	: { type : Date }
});

mongoose.model('Membership', membership);