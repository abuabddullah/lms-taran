const express = require("express");
const {
  generateFeeRecord,
  makePayment,
  getStudentFees,
} = require("../controllers/feeController");

const router = express.Router();

router.post("/generate", generateFeeRecord);
router.post("/pay", makePayment);
router.get("/:studentId", getStudentFees);

module.exports = router;
