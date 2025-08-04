const express = require("express");
const path = require("path");
const postRouter = express.Router();
const fs = require("fs");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const connectDB = require("../db");
const User = require('../models/user');

connectDB();

const rootDir = require("../utils/path");
// postRouter.use(express.static(path.join(__dirname, "public")));
postRouter.use(express.json());
const filePath = path.join(rootDir, "users.json");

function getUsersData() {
  const data = fs.readFileSync(filePath);
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("Error to parse the data !");
    return false;
  }
}

postRouter.post("/SignUp", async(req, res) => {
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

  try{
    const user = new User(userData);
    await user.save();
    console.log("sent the data ");
    return res.send('Saved to DB ! ')
    
  }
  catch(err){
    console.log("Error saving the data !",err);
    
  }
  // console.log(userData);

  //getting user data and push the new User !
  let users = getUsersData();
  users.push(userData);

  
  // writing the data into the file
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  postRouter

  console.log("File written successfully!");
  res.redirect("/DashBoard");
});

postRouter.post("/Login", (req, res) => {
  console.log("From Login Page : ", req.body);

  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  const existingUser = getUsersData();
  console.log("From the function :", existingUser);

  const user = existingUser.find((e) => {
    return e.email === userData.email;
  });

  if (!user) {
    res.status(401).send("Invalid Username !");
    return;
  }

  console.log("User Found", user);
  const passcheck = bcrypt.compareSync(userData.password, user.password);
  if (!passcheck) {
    return res.send("Incorrect password !");
  }
  return res.redirect("/DashBoard");
});

module.exports = postRouter;

//Login Logic

// 1. get the input values & store
// 2. Read the data store the users into an array
// 3. Match the users using the .find method !

postRouter.post("/dashBoard",(req,res)=>{
  console.log("The body of the emergency request",req.body);
  const requestData = {
    bloodGroup: req.body.bloodGroup,
    Units:req.body.Units,
    location:req.body.location,
    hospital:req.body.hospital,
    contactNumber:req.body.contactNumber,
    contactName:req.body.contactName,
    Reason : req.body.Reason,
  }

  console.log(requestData);
  
  
  res.sendStatus(200);
})


