const express = require("express");
const path = require("path");
const postRouter = express.Router();
const fs = require("fs");

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

postRouter.post("/SignUp", (req, res) => {
  console.log("Body : ", req.body);

  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    bloodGroup: req.body.bloodGroup,
    AadharNo: req.body.AadharNo,
    Location: req.body.Location,
    dateOfBirth: req.body.DOB,
  };
  // console.log(userData);

  //getting user data and push the new User !
  let users = getUsersData();
  users.push(userData);

  // writing the data into the file
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

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
    return e.email === userData.email && e.password === userData.password;
  });

  if (user) {
    console.log("User Found", user);
    res.redirect("/DashBoard");
  } else {
    res.status(401).send("Invalid Username !");
  }
});

module.exports = postRouter;

//Login Logic

// 1. get the input values & store
// 2. Read the data store the users into an array
// 3. Match the users using the .find method !
