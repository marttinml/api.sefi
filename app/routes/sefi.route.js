module.exports = function (app) {
    var Sefi = require('../controllers/sefi.controller');

    //CRUC
    app.route('/build').post(Sefi.build);
};