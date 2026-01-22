const mongoose = require("mongoose");

/* Subject Schema */
const subjectSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
  },
  modules: [
    {
      title: String,        // Module / Unit name
      topics: [String],     // Topics list
    }
  ]
});

/* Category Schema (Major, OE, VSC, etc.) */
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true, // e.g. "Major Courses"
  },
  optional: {
    type: Boolean,
    default: false, // true for OE, VEC, CC
  },
  subjects: [subjectSchema]
});

/* Main Semester Schema */
const nepSyllabusSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
      required: true, // "Semester 1"
    },
    totalCredits: {
      type: Number,
    },
    categories: [categorySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("NepSyllabus", nepSyllabusSchema);
