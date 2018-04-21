var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodosSchema = new Schema({
  title: String,
  description: String,
  status: String,
  dueDate: String,
});

module.exports = mongoose.model('Todo', TodosSchema);
