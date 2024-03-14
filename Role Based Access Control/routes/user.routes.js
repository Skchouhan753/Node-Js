const express = require("express");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/user.model");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(200).json({ msh: err });
      } else {
        const user = new UserModel({
          username,
          email,
          password: hash,
          role,
        });
        await user.save();
        res.status(200).json({ msh: "registered" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msh: err });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const accessToken = jwt.sign({ userID: user._id }, "masai",{expiresIn:30});
          const refreshToken = jwt.sign({ userID: user._id }, "school",{expiresIn:120});
          res.status(200).json({ msg: "Login Successfull", accessToken, refreshToken });
        } else {
          res.status(200).json({ msg: "Password does not match" });
        }
      });
    } else {
      res.status(200).json({ msg: "Wrong Credentials!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msh: err });
  }
});

module.exports = {
  userRouter,
};
