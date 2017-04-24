const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'User'},
  name: String,
  options: [{ type: Schema.Types.ObjectId, ref: 'Option'}],
  voters: [String]
});

module.exports = mongoose.model('Poll',pollSchema);
