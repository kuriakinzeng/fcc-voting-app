const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  _creator: { type: String, ref: 'User'},
  name: String,
  options: [{ type: String, ref: 'Option'}]
});

module.exports = mongoose.model('Poll',pollSchema);
