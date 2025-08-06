const express = require("express");
const path = require("path");
const postRouter = express.Router();
const fs = require("fs");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const connectDB = require("../db");

//models
const User = require("../models/user");
const register = require("../models/register");
const request = require("../models/request");

connectDB();
postRouter.use(express.json());

//Paths
const rootDir = require("../utils/path");
// const filePath = path.join(rootDir, "users.json");

postRouter.post("/SignUp", async (req, res) => {
  console.log("Body : ", req.body);

  const hassedPass = bcrypt.hashSync(req.body.password, 10);

  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: hassedPass,
    bloodGroup: req.body.bloodGroup,
    AadharNo: req.body.AadharNo,
    Location: req.body.Location,
    dateOfBirth: req.body.DOB,
  };

  try {
    const user = new User(userData);
    await user.save();
    console.log("sent the data to DB");
    return res.send("Saved to DB ! ");
  } catch (err) {
    console.log("Error saving the data !", err);
  }

  res.redirect("/DashBoard");
});

postRouter.post("/Login", async (req, res) => {
  console.log("From Login Page : ", req.body);

  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  const userExist = await User.findOne({ email: userData.email });
  if (!userExist) {
    console.log("User not found in the DB");
    return;
  }
  console.log("User found :", userExist);
  console.log("checking pass !");

  const passveerify = await bcrypt.compare(
    userData.password,
    userExist.password
  );
  console.log("pass check done!");

  if (!passveerify) {
    return res.send("Incorrect pass !");
  }
  return res.redirect("/DashBoard");
});

postRouter.post("/request", async (req, res) => {
  console.log("The body of the emergency request", req.body);
  const requestData = {
    bloodGroup: req.body.bloodGroup,
    Units: req.body.Units,
    location: req.body.location,
    hospital: req.body.hospital,
    contactNumber: req.body.contactNumber,
    contactName: req.body.contactName,
    Reason: req.body.Reason,
  };
  console.log(requestData);

  const emergencyRequest = new request(requestData);
  await emergencyRequest.save();

  console.log("Request data is sent to DB !");

  res.sendStatus(200);
});

postRouter.post("/register", async (req, res) => {
  const userdata = {
    bloodGroup: req.body.bloodGroup,
    location:  req.body.location,
    contactName:  req.body.contactName,
    contactInfo:  req.body.contactInfo,
  };


  const registration = new register(userdata);
  await registration.save()
});

module.exports = postRouter;
