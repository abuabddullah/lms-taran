const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  name: { type: String, required: true }, // e.g., "Monthly Test"
  date: { type: Date, required: true },
  results: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      marks: { type: Number },
      feedback: { type: String },
    },
  ],
});

module.exports = mongoose.model("Exam", examSchema);
