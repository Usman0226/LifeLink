const express = require('express');
const path = require("path");
const getRouter = express.Router();


const rootDir = require("../utils/path");

// getRouter.use(express.static(path.join(__dirname, "public")));

getRouter.get("/Login", (req, res) => {
  res.sendFile(path.join(rootDir, "public", "LOGIN.html"));
});

getRouter.get("/SignUp", (req, res) => {
  res.sendFile(path.join(rootDir, "public", "SignUp.html")); 
});

getRouter.get("/DashBoard", (req, res) => {
  res.sendFile(path.join(rootDir, "public", "DashBoard.html"));
});

module.exports = getRouter;