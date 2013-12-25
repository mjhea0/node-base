// dependencies
var fs = require('fs');
var http = require('http');
var express = require('express');
var routes = require('./routes');
var notFound = require('./middleware/notFound');
var path = require('path');
var config = require('./configuration');
var mongoose = require('mongoose');

// config - all environments
var app = express();
app.set('port', config.get("express:port"));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger({ immediate: true, format: 'dev' }));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// config - development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// mongo config
var MONGOLAB_URI= "add_your_mongolab_uri_here"
var mongo = process.env.MONGOLAB_URI || 'mongodb://localhost/node-base-advanced'
mongoose.connect(mongo);

// mongo model
// var Model_Name = require('add_your_models_here');

// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);
app.use(notFound.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
