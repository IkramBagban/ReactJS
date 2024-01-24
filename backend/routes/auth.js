const express = require("express");
const {body} = require('express-validator')
const { postLogin, postSignup } = require("../controllers/auth");

const router = express.Router();

router.post("/login", postLogin);

router.post("/signup",[
    body('username').isLength({min : 3}).withMessage("Username atleast 3 letter long"),
    body('email').isEmail().withMessage('Must be an email')
] ,postSignup);
module.exports = router;
