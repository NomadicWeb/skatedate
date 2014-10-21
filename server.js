// ====================================================
// Global Variables
// ====================================================
var express    = require('express'),
    app        = express(),
    path       = require('path'),
    expressValidator = require('express-validator'),
    logger     = require('express-logger');


// ====================================================
// APP CONFIG
// ====================================================
var conf       = require('./app/config/conf.js');
var bodyParser = require('body-parser');

app.set('port', conf.port);
app.set('views' , path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.use(logger({path: "./logfile.txt"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
// ====================================================
// MONGODB
// ====================================================
var mongoose   = require('mongoose');
mongoose.connect(conf.mongodburl);


// ====================================================
// ROUTING
// ====================================================
var router = require('./app/router')(app);

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;


// ====================================================
// SERVER
// ====================================================
app.listen(app.get('port'), function(){
      console.log('Listening on ' + app.get('port'));
});
