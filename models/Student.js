const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
    marks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Marks" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
