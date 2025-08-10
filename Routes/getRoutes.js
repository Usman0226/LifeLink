const express = require('express');
const path = require("path");
const getRouter = express.Router();
const auth = require('../public/js/auth');

const rootDir = require("../utils/path");
const getRequests = require('../models/request_data');

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

getRouter.get('/donate',auth,(req,res)=>{
 res.render(path.join(rootDir,"views","pages", "donate.ejs"),{
    jsfile : ['registerForm','emergencyForm']
  });
})

getRouter.get('/api/requestData', async (req,res)=>{
  try{
    const requests = await getRequests()
    res.json(requests)
  }catch(err){
    res.sendStatus(500)
  }
})

module.exports = getRouter;