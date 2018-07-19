const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

module.exports = Comments = mongoose.model('Comments', new Schema({
  blog: {type: Schema.Types.ObjectId, ref: 'Blog'},
  content: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}));
