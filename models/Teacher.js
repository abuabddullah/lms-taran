const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  uniqueID: { type: String, unique: true, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Assigned courses
  attendance: [
    {
      date: { type: Date, required: true },
      status: { type: String, enum: ["present", "absent"], required: true },
    },
  ],
  schedule: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      day: { type: String, required: true }, // e.g., "Monday"
      time: { type: String, required: true }, // e.g., "10:00 AM - 12:00 PM"
    },
  ],
});

module.exports = mongoose.model("Teacher", teacherSchema);
