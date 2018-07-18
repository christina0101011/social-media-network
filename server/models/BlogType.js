const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

module.exports = BlogType = mongoose.model('BlogType', new Schema({
  id: String,
  class: String,
  title: String
}));
