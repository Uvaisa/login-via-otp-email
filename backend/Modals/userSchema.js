const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "abcdefghijklmnop";
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
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
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
userSchema.methods.generateAuthtoken = async function () {
  try {
    const newtoken = jwt.sign({ _id: this._id }, SECRET_KEY, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: newtoken });
    await this.save();
    return newtoken;
  } catch (error) {
    resp.status(400).json(error);
  }
};

const users = new mongoose.model("users", userSchema);
module.exports = users;
