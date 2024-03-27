const express = require("express");

const { UserModel } = require("../model/user.model");

const bcrypt = require("bcrypt");

const userRouter = express.Router();

const jwt = require("jsonwebtoken");

// const cors = require("cors")

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.json({ err });
      } else {
        const user = new UserModel({ username, email, password:hash });
        await user.save();
        res.json({ msg: "A new user added" });
      }
    });
  } catch (err) {
    res.json({ err });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({userID:user._id,username:user.username},"masai")
        res.json({ msg: "Login Successgull", token });
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
