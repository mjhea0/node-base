var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name         : { type: String, required: true, index: true },
  created      : { type: Date, default: Date.now }
});

mongoose.model('User, UserSchema')
module.exports = mongoose;
