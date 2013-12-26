var mongoose = require('mongoose');
var config = require('../configuration');
var connectionString = config.get("mongo:url");
var options = { server: { auto_reconnect: true, poolSize: 10 } };

// connect to mongo
module.exports = connectionString
