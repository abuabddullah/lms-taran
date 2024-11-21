// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
//     attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
//     marks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Marks" }],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Student", studentSchema);

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  uniqueID: { type: String, unique: true, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Enrolled courses
  attendance: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      date: { type: Date, required: true },
      status: { type: String, enum: ["present", "absent"], required: true },
    },
  ],
  marks: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      subject: String,
      score: Number,
      examType: String, // e.g., "weekly", "monthly"
    },
  ],
  feesPaid: { type: Boolean, default: false },
  leaveRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Leave" }],
});

module.exports = mongoose.model("Student", studentSchema);
