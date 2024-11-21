// const express = require("express");
// const router = express.Router();
// const {
//   registerStudent,
//   loginStudent,
//   getAllStudents,
// } = require("../controllers/studentController");
// const authMiddleware = require("../middlewares/authMiddleware");

// // Register Student
// router.post("/register", registerStudent);

// // Login Student
// router.post("/login", loginStudent);

// // Get all Students (Admin access)
// // router.get("/", authMiddleware, getAllStudents);

// module.exports = router;

const express = require("express");
const {
  registerStudent,
  enrollInCourse,
  getStudentDetails,
  recordAttendance,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/enroll", enrollInCourse);
router.get("/:id", getStudentDetails);
router.post("/attendance", recordAttendance);

module.exports = router;
