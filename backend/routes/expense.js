const express = require("express");
const { body } = require("express-validator");

const { postExpense, getExpenses } = require("../controllers/expense");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get('/:userId',isAuth, getExpenses)

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
  isAuth,
  postExpense
);

module.exports = router;