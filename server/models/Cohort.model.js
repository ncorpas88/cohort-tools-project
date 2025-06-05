const {Schema, model} = require("mongoose");

const cohortSchema = new Schema({
  inProgress: Boolean,
  cohortSlug: String,
  cohortName: String,
  program: String,
  campus: String,
  startDate: String, 
  endDate: String,
  programManager: String,
  leadTeacher: String, 
  totalHours: Number,
});

const Cohort = model('Cohort', cohortSchema)
module.exports = Cohort