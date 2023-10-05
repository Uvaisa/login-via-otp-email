const mongoose = require("mongoose");
const validator = require("validator");

const userOtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("not valid Email");
      }
    },
  },
  otp: {
    type: String,
    required: true,
  },
});

const userotp = new mongoose.model("userotps", userOtpSchema);
module.exports = userotp;
