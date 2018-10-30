const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = ChatConversation = mongoose.model('ChatConversation', new Schema({
  participants: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  massage: {
    type: Schema.Types.ObjectId,
    ref: 'ChatMessage'
  }
}));