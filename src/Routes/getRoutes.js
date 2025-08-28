const express = require("express");
const path = require("path");
const getRouter = express.Router();
const auth = require("../middlewares/auth")
const donor = require("../models/user");
const Response = require("../models/response"); 

const rootDir = require("../../src/utils/path");
const getRequests = require("../models/request_data");

getRouter.get("/Login", (req, res) => {
  res.render(path.join(rootDir,'src',"views", "pages", "LOGIN.ejs"));
});

getRouter.get("/SignUp", (req, res) => {
  res.render(path.join(rootDir,'src', "views", "pages", "SignUp.ejs"));
});

getRouter.get("/DashBoard",auth,  async(req, res) => {
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

     res.render(path.join(rootDir,'src', "views", "pages", "DashBoard.ejs"), {
        user : user,
    jsfile: ["emergencyForm","polling"],
  });
  } catch (error) {
    console.log("Check the auth connection !")
    console.error("Error fetching", error);
    res.status(500).send("Internal Server Error.");
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

    res.render(path.join(rootDir,'src', "views", "pages", "donate.ejs"), {
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
      console.log("donor not found in DB with email:", userEmail);
      return res.status(404).send("donor not found.");
    }

    const user = {
      username: userData.username,
      bloodGroup: userData.bloodGroup,
      location: userData.location,
      phone: userData.phone,
    };

    res.render("profile", { user: user });
  } catch (error) {
    console.error("Error fetching", error);
    res.status(500).send("Internal Server Error.");
  }
});

getRouter.get("/api/request/:id/responses", async (req, res) => {
  try {
    const requestId = req.params.id;
    const responses = await Response.find({ requestId: requestId })
      .populate('responderId', 'username bloodGroup location phone')
      .sort({ createdAt: 1 }); 
      
    res.json(responses);
  } catch (err) {
    console.error("Error fetching responses:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

getRouter.get('/',auth, async(req,res)=>{
  try {
    const userEmail = req.user.email;
    console.log(" user email:", userEmail);

    const userData = await donor.findOne({ email: userEmail });

    if (!userData) {
      console.log("donor not found in DB with email:", userEmail);
      return res.status(404).send("donor not found.").render("/login");
    }

    const user = {
      username: userData.username,
      bloodGroup: userData.bloodGroup,
      location: userData.location,
      phone: userData.phone,
    };

     res.render(path.join(rootDir,'src', "views", "pages", "DashBoard.ejs"), {
        user : user,
    jsfile: ["emergencyForm","polling"],
  });
  } catch (error) {
    console.log("Check the auth connection !")
    console.error("Error fetching", error);
    res.status(500).send("Internal Server Error.");
  }
 
})


module.exports = getRouter;
