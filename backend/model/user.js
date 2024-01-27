const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
  },
  otpExpiration: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
