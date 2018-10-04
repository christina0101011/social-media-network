const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = Blog = mongoose.model('Blog', new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  photos: [{
    type: String
  }],
  likes: [Schema.Types.ObjectId],
  // comments: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Comments'
  // }],
  description: {
    type: String
  },
  url: String,
  theme: {
    type: Schema.Types.ObjectId,
    ref: 'Theme'
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'BlogType'
  },
  created_at: {
     type: Date, 
     default: Date.now 
  },
  updated_at: {
    type: Date, 
    default: Date.now 
  },
  deleted_at: {
    type: Date, 
    default: Date.now 
  }
}));
