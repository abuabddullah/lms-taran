const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, enum: ["student", "teacher", "staff"], required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["present", "absent", "on leave"],
    required: true,
  },
  fine: { type: Number, default: 0 }, // Fine for unauthorized absence
});

module.exports = mongoose.model("Attendance", attendanceSchema);
