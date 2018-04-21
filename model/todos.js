var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodosSchema = new Schema({
  title: String,
  description: String,
  status: String,
  dueDate: String,
});

// create compound index since we're sometimes searching for title & status
// none of these fields are unique
TodosSchema.index({ title: 1, status: 1 }, { unique: false });

// create single index on status
TodosSchema.index({ status: 1 }, { unique: false });

module.exports = mongoose.model('Todo', TodosSchema);
