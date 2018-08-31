const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = Theme = mongoose.model('Theme', new Schema({
  title: String,
  themeDescription: String
}));
