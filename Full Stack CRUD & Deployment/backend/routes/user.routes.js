const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcryptjs");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.json({ err });
      } else {
        const user = new UserModel({ username, password, email });
        await user.save();
        res.json({ msg: "A new user added" });
      }
    });
  } catch (err) {
    res.json({ err });
  }
});

userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    const user = UserModel.findOne({ email });
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({userID:user._id,userame:user.username},"masai")
        res.json({ msg: "Login Successgull" });
      } else {
        res.json({err})
      }
    });
  } catch (err) {
    res.json({err})
  }
});

module.exports = {
  userRouter,
};
