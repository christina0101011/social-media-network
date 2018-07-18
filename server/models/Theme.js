const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

module.exports = Theme = mongoose.model('Theme', new Schema({
  id: String,
  title: String,
  style: String,
  prefix: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: Date.now },
}));
