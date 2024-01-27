const express = require("express");
const {body} = require('express-validator')
const { postLogin, postSignup, getUser, updateUser } = require("../controllers/auth");

const router = express.Router();

router.get("/user/:userId", getUser);

router.post("/login", postLogin);

router.post("/signup",[
    body('username').isLength({min : 3}).withMessage("Username atleast 3 letter long"),
    body('email').isEmail().withMessage('Must be an email')
] ,postSignup);
module.exports = router;

router.patch("/user/:userId", [
    body("name").optional().isLength({ min: 3 }).withMessage("Name should be at least 3 characters long"),
    body("email").optional().isEmail().withMessage("Must be a valid email"),
  ], updateUser);
  
