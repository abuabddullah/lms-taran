const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  schedule: [
    {
      day: { type: String, required: true }, // e.g., "Monday"
      time: { type: String, required: true }, // e.g., "10:00 AM - 12:00 PM"
    },
  ],
  fees: {
    baseFee: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // percentage
  },
  isExamOnly: { type: Boolean, default: false },
});

module.exports = mongoose.model("Course", courseSchema);
