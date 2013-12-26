// dependencies
var fs = require('fs');
var http = require('http');
var express = require('express');
var routes = require('./routes');
var db = require('./db');
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

// mongo connect
// console.log(db)
mongoose.connect(db);

// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);
app.use(notFound.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('\nExpress server listening on port ' + app.get('port'));
});
mongoose.connection.on('open', function() {
  console.log('We have connected to mongodb');
});

module.exports = app;
