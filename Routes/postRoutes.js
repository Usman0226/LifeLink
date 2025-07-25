const express  = require("express")
const path = require('path');
const postRouter = express.Router();
const fs = require("fs");

// const rootDir = require("../utils/path");

// postRouter.use(express.static(path.join(__dirname, "public")));

postRouter.post("/SignUp", (req, res) => {
  console.log(req.body);

 const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    bloodGroup: req.body.bloodGroup,
    AadharNo: req.body.AadharNo,
    Location: req.body.Location,
  };
  console.log(userData);

  fs.appendFile("users.json", JSON.stringify(userData)+'\n', (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("File written successfully!");
  });
  res.redirect("/DashBoard");
  // fs.writeFile("db.json",JSON.stringify(userData));
});

postRouter.post("/Login", (req, res) => {
  console.log(req.body);
  res.redirect("/DashBoard");
});

module.exports = postRouter;