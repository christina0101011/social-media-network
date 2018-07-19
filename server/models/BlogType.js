const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

module.exports = BlogType = mongoose.model('BlogType', new Schema({
  class: String,
  title: String
}));
