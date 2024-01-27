const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../model/user");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }

    res.status(200).json({
      message: "User Fetched Successfully",
      success: true,
      data : user
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

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
    if (existingUser) {
      console.log("in existing user", !existingUser);
      return res
        .status(409)
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




exports.updateUser = async (req, res) => {
  const {userId} = req.params; 
  const { username, email } = req.body; 
console.log(username)
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' , success : false});
    }

    const isUserExist = await User.findOne({email:email, _id: { $ne: userId }});
    console.log('iseruserexist', isUserExist)
    
    if (isUserExist) {
      return res
        .status(409)
        .json({ message: "Email Already in user", success: false });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();

    res.status(200).json({ message: 'User profile updated successfully', user , success : true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' , success : false});
  }
};



exports.postSendOTP = async (req, res, next) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "email not found", success: false });
    }
    let otp = user.otp;

    if (!user.otp || user.otpExpiration <= Date.now()) {
      console.log("in");
      otp = Math.floor(Math.random() * 9000 + 1000);
      user.otp = otp;
      user.otpExpiration = Date.now() + 300000;
    }

    await user.save();
    transporter.sendMail({
      to: email,
      from: "bagbanikram@gmail.com",
      subject: "OTP to forget password.",
      html: `
            <div>
                <h3>OTP</h3>
                ${otp}
            </div>
            `,
    });
    res
      .status(200)
      .json({ message: "OTP has sent to your email", otp: otp, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal error", success: false });
  }
};

exports.postVerifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({
      email: email,
      otp: otp,
    });
    console.log("user", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid OTP", success: false });
    }

    if (user.otpExpiration <= Date.now()) {
      return res.status(401).json({ message: "Otp expired", success: false });
    }
    user.otp = undefined;
    user.otpExpiration = undefined;

    const response = await user.save();
    if (!response) {
      return res.status(500).json({ message: "server error", success: false });
    }
    res
      .status(200)
      .json({ message: "OTP verified successfully", success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error", success: false });
  }
};

exports.postResetPassword = async (req, res, next) => {
  const { email, Password, confirmPassword } = req.body;
  try {
    console.log(req.body);
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Email Not Found.", success: false });
    }

    if (Password !== confirmPassword) {
      return res
        .status(401)
        .json({ message: "password don't match.", success: false });
    }

    const hashedPassword = await bcrypt.hash(Password, 12);

    if (!hashedPassword) {
      return res.status(500).json({ message: "server error", success: false });
    }
    user.password = hashedPassword;
    // user.confirmPassword = confirmPassword;

    const response = await user.save();

    if (response) {
      res.status(200).json({ message: "Password Reset.", success: true });
    }
  } catch (err) {
    res.status(500).json({ message: "Password reset failed", success: false });
    console.log(err);
  }
};
