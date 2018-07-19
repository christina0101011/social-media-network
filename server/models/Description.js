const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

module.exports = Description = mongoose.model('Description', new Schema({
  blog: {type: Schema.Types.ObjectId, ref: 'Blog'},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: Date.now }
}));
