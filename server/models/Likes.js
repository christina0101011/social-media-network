const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

module.exports = Likes = mongoose.model('Likes', new Schema({
  blog: {type: Schema.Types.ObjectId, ref: 'Blog'},
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}));
