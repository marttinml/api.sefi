module.exports = function (app) {
    var Membership = require('../controllers/membership.controller');
    

    app.route('/insert').post(Membership.insert);
    app.route('/find').post(Membership.find);
    app.route('/remove').post(Membership.remove);
    app.route('/login').post(Membership.login);
    app.route('/logout').post(Membership.logout);
    app.route('/session').post(Membership.session);
};