const express = require("express");

const { UserModel } = require("../model/user.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// const { blacklist } = require("../logout/logout");

const { BlackListModel } = require("../model/blacklist.model");

const userRouter = express.Router();

require("dotenv").config();

const SECRET_CODE = process.env.SECRET_CODE;

userRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      res.status(200).json({ msg: "User Already registered" });
    } else {
      bcrypt.hash(password, 5, (err, hash) => {
        if (!err) {
          const user = new UserModel({
            username,
            email,
            password: hash,
          });
          user.save();
          res.status(200).json({ msg: "User added successfully" });
        } else {
          res.status(400).json({ msg: err });
        }
      });
    }
  } catch (err) {}
});
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userID: user._id, username: user.username },
          SECRET_CODE,{expiresIn:'1h'}
        );

        const blacklist = new BlackListModel({ token });
        await blacklist.save();

        res.status(200).json({ msg: "login successfull", token });
      } else {
        res.status(400).json({ msg: err });
      }
    });
  } catch (err) {}
});

userRouter.get("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      // Find and delete the token from the blacklist
      await BlackListModel.findOneAndDelete({ token });

      // Send a success message
      return res.status(200).json({ msg: "You have been Logged out!" });
    } else {
      // If token is not provided in headers
      return res.status(400).json({ msg: "Token not provided" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = {
  userRouter,
};
