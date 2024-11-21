const express = require("express");
const {
  markAttendance,
  getAttendanceSummary,
  generateFineReport,
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/mark", markAttendance);
router.get("/summary/:userId", getAttendanceSummary);
router.get("/fines", generateFineReport);

module.exports = router;
