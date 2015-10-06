module.exports = function (app) {
    var Membership = require('../controllers/membership.controller');
    

    //CRUC
    app.route('/create').post(Membership.create);
    app.route('/retrieve').post(Membership.retrieve);
    app.route('/update').post(Membership.update);

    app.route('/find').post(Membership.find);
    app.route('/login').post(Membership.login);
    app.route('/test').get(Membership.test);

    
};