const Attendance = require("../models/Attendance");
const User = require("../models/User");

// Mark attendance for a user
exports.markAttendance = async (req, res) => {
  const { userId, role, date, status, fine } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found." });

    const existingAttendance = await Attendance.findOne({ user: userId, date });

    if (existingAttendance) {
      existingAttendance.status = status;
      existingAttendance.fine = fine || 0;
      await existingAttendance.save();
      return res
        .status(200)
        .json({ message: "Attendance updated successfully." });
    }

    const attendance = await Attendance.create({
      user: userId,
      role,
      date,
      status,
      fine: fine || 0,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attendance summary for a user
exports.getAttendanceSummary = async (req, res) => {
  const { userId } = req.params;

  try {
    const attendance = await Attendance.find({ user: userId });

    const summary = attendance.reduce(
      (acc, record) => {
        acc[record.status]++;
        return acc;
      },
      { present: 0, absent: 0, "on leave": 0 }
    );

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate fine report for absences
exports.generateFineReport = async (req, res) => {
  try {
    const fines = await Attendance.find({
      status: "absent",
      fine: { $gt: 0 },
    }).populate("user");

    const report = fines.map((record) => ({
      name: record.user.name,
      role: record.role,
      date: record.date.toISOString().split("T")[0],
      fine: record.fine,
    }));

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
