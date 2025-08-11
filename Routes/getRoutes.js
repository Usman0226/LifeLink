const express = require("express");
const path = require("path");
const getRouter = express.Router();
const auth = require("../public/js/auth");
const User = require("../models/user");
const { user } = require("./postRoutes");

const rootDir = require("../utils/path");
const getRequests = require("../models/request_data");

getRouter.get("/Login", (req, res) => {
  res.render(path.join(rootDir, "views", "pages", "LOGIN.ejs"));
});

getRouter.get("/SignUp", (req, res) => {
  res.render(path.join(rootDir, "views", "pages", "SignUp.ejs"));
});

getRouter.get("/DashBoard", auth, async(req, res) => {
    try {
    const userEmail = req.user.email;
    console.log(" user email:", userEmail);

    const userData = await User.findOne({ email: userEmail });

    if (!userData) {
      console.log("User not found in DB with email:", userEmail);
      return res.status(404).send("User not found.");
    }

    const user = {
      username: userData.username,
      bloodGroup: userData.bloodGroup,
      location: userData.Location,
      phone: userData.phone,
    };

     res.render(path.join(rootDir, "views", "pages", "DashBoard.ejs"), {
        user: user,
    jsfile: ["emergencyForm"],
  });
  } catch (error) {
    console.error("Error fetching", error);
    res.status(500).send("Internal Server Error.");
  }
 
});

getRouter.get("/donate", auth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    console.log(" user email:", userEmail);

    const userData = await User.findOne({ email: userEmail });

    if (!userData) {
      console.log("User not found in DB with email:", userEmail);
      return res.send("User not found.").redirect("/login");
    }

    const user = {
      username: userData.username,
      bloodGroup: userData.bloodGroup,
      location: userData.Location,
      phone: userData.phone,
    };

    res.render(path.join(rootDir, "views", "pages", "donate.ejs"), {
      user: user,
      jsfile: ["registerForm", "emergencyForm"],
    });

  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Internal Server Error.");
  }
});

getRouter.get("/api/requestData", async (req, res) => {
  try {
    const requests = await getRequests();
    res.json(requests);
  } catch (err) {
    res.sendStatus(500);
  }
});

getRouter.get("/profile", auth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    console.log(" user email:", userEmail);

    const userData = await User.findOne({ email: userEmail });

    if (!userData) {
      console.log("User not found in DB with email:", userEmail);
      return res.status(404).send("User not found.");
    }

    const user = {
      username: userData.username,
      bloodGroup: userData.bloodGroup,
      location: userData.Location,
      phone: userData.phone,
    };

    res.render("profile", { user: user });
  } catch (error) {
    console.error("Error fetching", error);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = getRouter;
