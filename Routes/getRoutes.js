const express = require('express');
const path = require("path");
const getRouter = express.Router();
const auth = require('../public/js/auth');

const rootDir = require("../utils/path");

getRouter.get("/Login", (req, res) => {
  res.render(path.join(rootDir, "views","pages", "LOGIN.ejs"));
});

getRouter.get("/SignUp", (req, res) => {
  res.render(path.join(rootDir, "views","pages", "SignUp.ejs")); 
});

getRouter.get("/DashBoard",auth, (req, res) => {
  res.render(path.join(rootDir,"views","pages", "DashBoard.ejs"),{
    jsfile : ['emergencyForm']
  });
});

getRouter.get('/donate',auth,(req,res)=>{
 res.render(path.join(rootDir,"views","pages", "donate.ejs"),{
    jsfile : ['registerForm','emergencyForm']
  });
})

module.exports = getRouter;