const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = Photos = mongoose.model('Photos', new Schema({
  url: {
    type: String
  }
}));
