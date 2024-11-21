const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  mode: { type: String, enum: ["online", "offline"], required: true }, // Class mode
  room: { type: String }, // For offline mode, specify the room
  notes: { type: String }, // Additional notes for the class
});

module.exports = mongoose.model("Schedule", scheduleSchema);
