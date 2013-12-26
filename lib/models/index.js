var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestSchema = new Test({
  name    : { type: String, required: true, index: true },
  email   : { type: String, required: true},
  created : { type: Date, default: Date.now }
});

mongoose.model('Test, TestSchema')
module.exports = mongoose;
