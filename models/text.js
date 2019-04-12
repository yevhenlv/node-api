var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var schema = new Schema({
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Text', schema);