const express = require("express");
const path = require("path");
const postRouter = express.Router();
const fs = require("fs");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const connectDB = require("../db");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mailTo = require("../services/mailer");
require("dotenv").config();

//models
const User = require("../models/user");
const register = require("../models/register");
const request = require("../models/request");
const Response = require("../models/response");

connectDB();
postRouter.use(express.json());

//Paths
const rootDir = require("../utils/path");
const auth = require("../../public/js/auth");

postRouter.post("/SignUp", async (req, res) => {
  console.log("Body : ", req.body);

  const { username, email, password, bloodGroup, phone, Location, DOB } =
    req.body;

  if (!username || !email) {
    return res.status(400).send("Please provide all required fields.");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      username: username,
      email: email,
      password: hashedPassword,
      bloodGroup: bloodGroup,
      phone: phone,
      location: Location,
      dateOfBirth: DOB,
    };

    const user = new User(userData);
    await user.save();
    console.log("Dta sent to DB.");

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`Generated OTP: ${otp}`);
    await sendSMS(phone, `Your OTP for LifeLink is ${otp}.`);

    res.redirect("/DashBoard");
  } catch (err) {
    console.error("An error during sign up:", err);
    return res.status(500).send("Internal Server Error.");
  }
});

postRouter.post("/Login", async (req, res) => {
  console.log("From Login Page : ", req.body);

  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  if (!userData.email || !userData.password) {
    return res
      .status(201)
      .send("Please provide both email and password.")
      .redirect("/login");
  }

  const userExist = await User.findOne({ email: userData.email });
  if (!userExist) {
    console.log("User not found in the DB");
    return res.send("Invalid User email ! ");
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
  //payload , secret key , expire time
  const token = jwt.sign(
    { id: userExist._id, email: userExist.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  const refreshToken = jwt.sign(
    { id: userExist._id, email: userExist.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
  );

  userExist.refreshToken = refreshToken;
  await userExist.save();
  const tokenExpiresInSeconds = parseInt(process.env.JWT_EXPIRES_IN, 10) * 1000;
  const refreshTokenExpiresInSeconds =
    parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10) * 1000;

  res.cookie(
    "token",
    token,
    { httpOnly: true },
    { maxAge: tokenExpiresInSeconds }
  );
  res.cookie(
    "refreshToken",
    refreshToken,
    { httpOnly: true },
    { maxAge: refreshTokenExpiresInSeconds }
  );

  return res.redirect("/DashBoard");
});

// save the requests to DB
postRouter.post("/request", async (req, res) => {
  console.log("The body of the emergency request", req.body);
  const requestData = {
    bloodGroup: req.body.bloodGroup,
    Units: req.body.Units,
    location: req.body.location,
    hospital: req.body.hospital,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
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
    location: req.body.Location,
    contactName: req.body.contactName,
    contactInfo: req.body.contactInfo,
  };

  const registration = new register(userdata);
  await registration.save();

  res.redirect("/donate");
});

postRouter.post("/logout", auth, async (req, res) => {
  try {
    if (req.cookies.refreshToken) {
      await User.updateOne(
        { refreshToken: req.cookies.refreshToken },
        { $unset: { refreshToken: "" } }
      );
    }

    res.clearCookie("token", { httpOnly: true });
    res.clearCookie("refreshtoken", { httpOnly: true });
    return res.redirect("/dashBoard");
  } catch (err) {
    console.log(err);
    return res.redirect("/login");
  }
});

postRouter.post("/request/:requestId/respond", auth, async (req, res) => {
  try {
    const requestId = req.params.requestId;
    console.log(requestId)
    const requestUser = await request.findById(requestId)
    if(!requestUser){
      console.log("in the if statement ")
      return res.status(404);
    }
    console.log("the requester is ",requestUser)
    const requester = requestUser.email;
    const responderId = req.user.id;

    const responder = await User.findById(responderId);
    const responderEmail = responder.email;
    console.log(responderEmail);

    if (!responder) {
      return res.status(404).json({ error: "User not found." });
    }

    const newResponse = new Response({
      requestId: requestId,
      responderId: responderId,
      responderDetails: {
        username: responder.username,
        bloodGroup: responder.bloodGroup,
        location: responder.Location,
        phone: responder.phone,
      },
    });

    await newResponse.save();
    console.log(`New response saved ID: ${requestId}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_MAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.error("Transporter error:", error);
      } else {
        console.log("Server is ready");
      }
    });

    const mailContent = {
      from: process.env.NODEMAILER_MAIL,
      to: requester,
      subject: "Donor for your Blood Request ",
      text: `
      A donor have been responded to your blood request. 
      Below are the details of the donor :

        - Name: ${responder.username}
        - Blood Group: ${responder.bloodGroup}
        - Location: ${responder.Location}
        - Phone: ${responder.phone}
      `,
    };

    await transporter.sendMail(mailContent);
    console.log("Mail is successfully sent !");

    res.status(201).json({ message: "Response submitted successfully." });
  } catch (err) {
    console.error("Error response", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});


  otpObj = {};

postRouter.post("/sendOtp", async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp);
  otpObj[email] = otp;
  const { email } = req.body;

  const subject = "OTP for SignUp"

  const text = `Your OTP to login into the LifeLink is ${otp}`;

  await mailTo(text, email,subject);
res.status(200).json({ success: true, message: "OTP sent successfully" });

});

console.log(otpObj)

postRouter.post("/verifyOtp",(req,res)=>{
  const {email,InputOTP} = req.body;
  if(otpObj[email] == InputOTP ){
    console.log("OTP verified ! ")
  }
res.status(200).json({ success: true, message: "OTP verified successfully" });

})

module.exports = postRouter;
