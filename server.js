var mongoose = require('./config/mongoose'),
    express  = require('./config/express'),
    db       = mongoose(),
    app      = express();

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log(" - - - - - - - - - - - - - - - - - - - - - - - ");
    console.log(" |     API REST [sefi] - http://localhost:" + port + "      | ");
    console.log(" - - - - - - - - - - - - - - - - - - - - - - - ");
});

//module.exports = app;