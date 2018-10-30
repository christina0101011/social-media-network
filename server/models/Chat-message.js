const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = ChatMessage = mongoose.model('ChatMessage', new Schema({
  user: {
    // type: Schema.Types.ObjectId,
    // ref: 'User'
    type: String
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'ChatConversation'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  content: String
}));