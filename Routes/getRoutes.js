const express = require('express');
const path = require("path");
const getRouter = express.Router();


const rootDir = require("../utils/path");

getRouter.get("/Login", (req, res) => {
  res.render(path.join(rootDir, "views","pages", "LOGIN.ejs"));
});

getRouter.get("/SignUp", (req, res) => {
  res.render(path.join(rootDir, "views","pages", "SignUp.ejs")); 
});

getRouter.get("/DashBoard", (req, res) => {
  res.render(path.join(rootDir,"views","pages", "DashBoard.ejs"),{
    jsfile : ['emergencyForm']
  });
});

getRouter.get('/donate',(req,res)=>{
 res.render(path.join(rootDir,"views","pages", "donate.ejs"),{
    jsfile : ['registerForm','emergencyForm']
  });
})

module.exports = getRouter;