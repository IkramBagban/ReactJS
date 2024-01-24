const bcrypt = require("bcrypt");
const User = require("../model/user");
const { validationResult } = require("express-validator");
exports.postLogin = (req, res) => {
  const { email, password } = req.body;
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

    const existingUser = await User.find({ email: email });
    if (existingUser) {
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
