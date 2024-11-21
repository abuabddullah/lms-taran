const express = require("express");
const {
  requestLeave,
  updateLeaveStatus,
  getLeaveStatus,
  getAllLeaveRequests,
} = require("../controllers/leaveController");

const router = express.Router();

router.post("/request", requestLeave);
router.post("/update-status", updateLeaveStatus);
router.get("/status/:userId", getLeaveStatus);
router.get("/all", getAllLeaveRequests);

module.exports = router;
