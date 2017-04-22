const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  _poll: { type: String, ref: 'Poll'},
  name: String,
  voters: [{ type: String, ref: 'User'}]
});

module.exports = mongoose.model('Option', optionSchema);
