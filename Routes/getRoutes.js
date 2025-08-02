const express = require('express');
const path = require("path");
const getRouter = express.Router();


const rootDir = require("../utils/path");

// getRouter.use(express.static(path.join(__dirname, "public")));

getRouter.get("/Login", (req, res) => {
  res.render(path.join(rootDir, "public", "LOGIN.ejs"));
});

getRouter.get("/SignUp", (req, res) => {
  res.render(path.join(rootDir, "public", "SignUp.ejs")); 
});

getRouter.get("/DashBoard", (req, res) => {
  res.render(path.join(rootDir, "public", "DashBoard.ejs"));
});

getRouter.get('/donate',(req,res)=>{
 res.render(path.join(rootDir,"views", "donate.ejs"));
})

module.exports = getRouter;