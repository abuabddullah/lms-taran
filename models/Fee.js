const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  baseFee: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Discount percentage
  fine: { type: Number, default: 0 }, // Fines for absences
  totalFee: { type: Number, required: true },
  status: { type: String, enum: ["paid", "pending"], default: "pending" },
  paymentDate: { type: Date },
});

module.exports = mongoose.model("Fee", feeSchema);
