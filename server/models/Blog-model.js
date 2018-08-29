const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blog = new Schema({
  description: {type: String, default: null},
  url: {type: String, default: null},
  gallery: {type: [], default: []},
  theme:  {type: String, default: null},
  date: { type: Date, default: Date.now },
  meta: {
    votes: Number,
    favs:  Number
  }
});

const Blog = mongoose.model('Blog', blog)

module.exports = Blog