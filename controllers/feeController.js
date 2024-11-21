const Fee = require("../models/Fee");
const Student = require("../models/Student");
const Course = require("../models/Course");

// Calculate total fee
const calculateTotalFee = (baseFee, discount, fine) => {
  const discountAmount = (baseFee * discount) / 100;
  return baseFee - discountAmount + fine;
};

// Generate fee record for a student
exports.generateFeeRecord = async (req, res) => {
  const { studentId, courseId, discount, fine } = req.body;

  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: "Student or Course not found." });
    }

    const baseFee = course.fees.baseFee;
    const totalFee = calculateTotalFee(baseFee, discount, fine);

    const feeRecord = await Fee.create({
      student: studentId,
      course: courseId,
      baseFee,
      discount,
      fine,
      totalFee,
    });

    res.status(201).json(feeRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Make a payment
exports.makePayment = async (req, res) => {
  const { feeId } = req.body;

  try {
    const fee = await Fee.findById(feeId);

    if (!fee) return res.status(404).json({ message: "Fee record not found." });

    fee.status = "paid";
    fee.paymentDate = new Date();
    await fee.save();

    res.status(200).json({ message: "Payment successful." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all fee records for a student
exports.getStudentFees = async (req, res) => {
  const { studentId } = req.params;

  try {
    const fees = await Fee.find({ student: studentId }).populate("course");
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
