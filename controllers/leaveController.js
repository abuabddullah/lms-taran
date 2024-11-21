const Leave = require("../models/Leave");
const User = require("../models/User");

// Request leave
exports.requestLeave = async (req, res) => {
  const { userId, role, startDate, endDate, reason } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const leaveRequest = new Leave({
      user: userId,
      role,
      startDate,
      endDate,
      reason,
    });

    await leaveRequest.save();
    res.status(201).json({ message: "Leave request submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve or reject leave request
exports.updateLeaveStatus = async (req, res) => {
  const { leaveId, status } = req.body;

  try {
    const leaveRequest = await Leave.findById(leaveId);

    if (!leaveRequest)
      return res.status(404).json({ message: "Leave request not found." });

    leaveRequest.status = status;
    await leaveRequest.save();

    res.status(200).json({ message: `Leave request ${status} successfully.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get leave status for a specific user
exports.getLeaveStatus = async (req, res) => {
  const { userId } = req.params;

  try {
    const leaveRequests = await Leave.find({ user: userId });

    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all leave requests (Admin view)
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Leave.find().populate("user");

    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
