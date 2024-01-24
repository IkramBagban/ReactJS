const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid Email Or Password", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("ismatch", isMatch);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid Email Or Password", success: false });
    }

    const token = jwt.sign(
      {
        email: email,
        userId: user._id,
      },
      "mysecretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successfully",
      success: true,
      token: token,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};
exports.postSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      res.status(401).json({
        message: "Validation Error",
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const existingUser = await User.findOne({ email: email });
    console.log("existing user", existingUser);
    if (existingUser) {
      console.log("in existing user", !existingUser);
      return res
        .status(400)
        .json({ message: "Email Already in user", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const response = await user.save();
    res
      .status(201)
      .json({ message: "User has been created successfully", success: true });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};
