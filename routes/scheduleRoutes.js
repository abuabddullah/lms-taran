const express = require("express");
const {
  createSchedule,
  getCourseSchedule,
  getTeacherSchedule,
  getAllSchedules,
} = require("../controllers/scheduleController");

const router = express.Router();

router.post("/create", createSchedule);
router.get("/course/:courseId", getCourseSchedule);
router.get("/teacher/:teacherId", getTeacherSchedule);
router.get("/all", getAllSchedules);

module.exports = router;
