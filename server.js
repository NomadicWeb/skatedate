// ====================================================
// Global Variables
// ====================================================
var express    = require('express'),
    livereload = require('express-livereload'),
    app        = express(),
    expressValidator = require('express-validator'),
    logger     = require('express-logger');


// ====================================================
// APP CONFIG
// ====================================================
//var conf       = require('./app/config/conf.example.js');
var bodyParser = require('body-parser');

app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');

app.use(express.static(__dirname + '/app/assets/'));
app.use(logger({path: "./logfile.txt"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

// ====================================================
// MONGODB
// ====================================================
//var mongoose   = require('mongoose');


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
livereload(app, {watchDir: process.cwd() + "/app/"});
var port = process.env.PORT || 5000;
app.listen(port, function(){
      console.log('Listening on ' + port);
});
