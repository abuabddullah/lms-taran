const express = require("express");
const {
  createExam,
  addResult,
  getResults,
  getMarksheet,
} = require("../controllers/examController");

const router = express.Router();

router.post("/create", createExam);
router.post("/add-result", addResult);
router.get("/results/:examId", getResults);
router.get("/marksheet/:studentId", getMarksheet);

module.exports = router;
