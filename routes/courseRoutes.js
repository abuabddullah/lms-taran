const express = require("express");
const {
  createCourse,
  assignTeacher,
  enrollStudent,
  setSchedule,
  getCourses,
} = require("../controllers/courseController");

const router = express.Router();

router.post("/create", createCourse);
router.post("/assign-teacher", assignTeacher);
router.post("/enroll-student", enrollStudent);
router.post("/set-schedule", setSchedule);
router.get("/all", getCourses);

module.exports = router;
