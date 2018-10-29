const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = ChatMessage = mongoose.model('ChatMessage', new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  content: String
}));