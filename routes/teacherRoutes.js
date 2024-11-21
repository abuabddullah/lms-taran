const express = require("express");
const {
  registerTeacher,
  assignCourse,
  setSchedule,
  recordAttendance,
} = require("../controllers/teacherController");

const router = express.Router();

router.post("/register", registerTeacher);
router.post("/assign-course", assignCourse);
router.post("/set-schedule", setSchedule);
router.post("/attendance", recordAttendance);

module.exports = router;
