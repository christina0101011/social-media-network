const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

module.exports = Photos = mongoose.model('Photos', new Schema({
  id: String,
  url: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: Date.now },
}));
