const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = ChatMessage = mongoose.model('ChatMessage', new Schema({
  sentFrom: { 
    type: Schema.Types.ObjectId, 
    ref: 'User'},
  sentTo: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User'}],
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