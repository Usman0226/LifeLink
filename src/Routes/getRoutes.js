const express = require("express");
const path = require("path");
const getRouter = express.Router();
const auth = require("../middlewares/auth");
const donor = require("../models/user");
const Response = require("../models/response");

const rootDir = require("../../src/utils/path");
const getRequests = require("../models/request_data");
const { getgroups } = require("process");

getRouter.get("/Login", (req, res) => {
  res.render(path.join(rootDir, "src", "views", "pages", "LOGIN.ejs"));
});

getRouter.get("/SignUp", (req, res) => {
  res.render(path.join(rootDir, "src", "views", "pages", "SignUp.ejs"));
});

getRouter.get("/DashBoard", auth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    console.log(" user email:", userEmail);

    const userData = await donor.findOne({ email: userEmail });

    if (!userData) {
      console.log("donor not found in DB with email:", userEmail);
      return res.status(404).send("donor not found.");
    }

    const user = {
      username: userData.username,
      bloodGroup: userData.bloodGroup,
      location: userData.location,
      phone: userData.phone,
      role: userData.role,
    };

    res.render(path.join(rootDir, "src", "views", "pages", "DashBoard.ejs"), {
      user: user,
      jsfile: ["emergencyForm", "polling"],
    });
  } catch (error) {
    console.log("Check the auth connection !");
    console.error("Error fetching", error);
    res.status(500).send(" From getRoutes : Internal Server Error.");
  }
});

getRouter.get("/donate", auth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    console.log(" user email:", userEmail);

    const userData = await donor.findOne({ email: userEmail });

    if (!userData) {
      console.log("donor not found in DB with email:", userEmail);
      return res.send("donor not found.").redirect("/login");
    }

    const user = {
      username: userData.username,
      bloodGroup: userData.bloodGroup,
      location: userData.location,
      phone: userData.phone,
    };

    res.render(path.join(rootDir, "src", "views", "pages", "donate.ejs"), {
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

    const userData = await donor.findOne({ email: userEmail });

    if (!userData) {
      console.log("Donor not found in DB with email:", userEmail);
      return res.status(404).send("donor not found.");
    }

    const user = {
      username: userData.username,
      bloodGroup: userData.bloodGroup,
      location: userData.location,
      phone: userData.phone,
      role: userData.role,
    };

    res.render("profile", { user: user });
  } catch (error) {
    console.error("Error fetching", error);
    res.status(500).send("Internal Server Error.");
  }
});

// for polling the request's in frontend
// getRouter.get("/api/request/:id/responses", async (req, res) => {
//   try {
//     const requestId = req.params.id;
//     const responses = await Response.find({ requestId: requestId })
//       .populate('responderId', 'username bloodGroup location phone')
//       .sort({ createdAt: 1 }); // from start

//     res.json(responses);
//   } catch (err) {
//     console.error("Error fetching responses:", err);
//     res.status(500).json({ error: "Internal Server Error." });
//   }
// });

getRouter.get("/", async (req, res) => {
  try {
    res.render(path.join(rootDir, "src", "views", "pages", "DashBoard.ejs"), {
      user: null,
      jsfile: ["emergencyForm"],
    });
  } catch (error) {
    console.error("Error rendering public dashboard:", error);
    res.status(500).send("Internal Server Error.");
  }
});

getRouter.get("/userProfile", auth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    console.log(" user email:", userEmail);

    const userData = await donor.findOne({ email: userEmail });

    if (!userData) {
      console.log("donor not found in DB with email:", userEmail);
      return res.status(404).send("donor not found.");
    }

    const user = {
      username: userData.username,
      bloodGroup: userData.bloodGroup,
      location: userData.location,
      phone: userData.phone,
    };

    res.render("userProfile", { user: user });
  } catch (error) {
    console.error("Error fetching", error);
    res.status(500).send("Internal Server Error.");
  }
});

getRouter.get("/userLogin", (req, res) => {
  res.render(path.join(rootDir, "src", "views", "pages", "userSignUp.ejs"));
});

module.exports = getRouter;
