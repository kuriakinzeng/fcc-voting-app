const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  _poll: { type: Schema.Types.ObjectId, ref: 'Poll'},
  name: String,
  votes: {type:Number, default:0}
});

module.exports = mongoose.model('Option', optionSchema);
