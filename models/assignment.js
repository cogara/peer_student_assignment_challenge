//assignment_number, student_name, score, date_completed
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
  assignmentNumber: String,
  studentName: String,
  score: String,
  dateCompleted: Date
});

var Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
