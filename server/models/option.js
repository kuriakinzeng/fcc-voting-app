const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  _poll: { type: Schema.Types.ObjectId, ref: 'Poll'},
  name: String,
  voters: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Option', optionSchema);
