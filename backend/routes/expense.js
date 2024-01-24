const express = require("express");
const { body } = require("express-validator");
const { postExpense } = require("../controllers/expense");

const router = express.Router();

router.post(
  "/create-expense",
  [
    body("title")
      .exists()
      .withMessage("Title is required")
      .isString()
      .withMessage("Title should be a string."),
    body("date").exists().withMessage("Date is required"),
    body("amount").exists().withMessage("Amount is required"),
  ],
  postExpense
);

module.exports = router;
