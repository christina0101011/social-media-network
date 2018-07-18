const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

module.exports = User = mongoose.model('User', new Schema({
  id: String,
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  avatar: {type: String},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: Date.now }
}));
