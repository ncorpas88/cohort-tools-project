const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema ({
  firstName: String, 
  lastName: String,
  email: String,
  phone: String, 
  linkedinURL: String,
  languages: { 
    type: [String], 
    enum: ['English', 'Dutch', 'Portuguese', 'French', 'Spanish', 'German'] },
  program: String,
  background: String,
  image: String,
  projects: [String],
  cohort: { 
    type: Schema.Types.ObjectId, 
    ref: 'Cohort' 
  },
})

const Student = mongoose.model('Student', studentSchema)
module.exports = Student