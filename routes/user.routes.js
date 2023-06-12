const express = require("express");
const { userModel } = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { blackListModel } = require("../models/Blacklist.model");
const { auth } = require("../middlewares/auth.middlewares");
require("dotenv").config();
// userRouter.get("/",(req,res)=>{

// }) this is for my learning and understanding purpose

userRouter.post("/register", async (req, res) => {
  const { email, pass } = req.body;
  let user = await userModel.findOne({ email });
  try {
    if (!user) {
      bcrypt.hash(pass, 4, async (err, hash) => {
        if (err) {
          res.status(400).json({ err: err?.message });
        } else {
          let userData = userModel(req.body);
          await userData.save();
          res.json({ msg: "User Registered Succesfully!!", userData });
        }
      });
    } else {
      res.status(400).json({ msg: "User already exist, please login !!" });
    }
  } catch (error) {
    res.status(400).json({ error: error?.message });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  let user = await userModel.findOne({ email });
  try {
    if (user) {
      bcrypt.compare(pass, user?.pass, async (err, result) => {
        if (err) {
          res.status(400).json({ err: err?.message });
        } else {
          if (result) {
            jwt.sign(
              { userID: user._id, userEmail: user?.email },
              process.env.secret,
              { expiresIn: "7d" },
              (err, token) => {
                if (token) {
                  res.json({ msg: "User login Successfully !!", token });
                } else {
                  res.status(400).json({ err: err?.message });
                }
              }
            );
          } else {
            res.json({ msg: "Wrong Password" });
          }
        }
      });
    } else {
      res
        .status(400)
        .json({ msg: " User not exist, please register First !!" });
    }
  } catch (error) {
    res.status(400).json({ error: error?.message });
  }
});
userRouter.post("/logout", auth,async(req, res) => {
    const {token } = req.body;
    try {
        let blackList = blackListModel({token});
        await blackList.save();
        res.json({msg:"Logout succesfully"});
    } catch (error) {
        res.status(400).json({err:error?.message});
    }
});

module.exports = {
  userRouter,
};
