const express = require("express");
const path = require("path");
const parser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(parser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

//get routes
app.get("/Login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "LOGIN.html"));
});

app.get("/SignUp", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "SignUp.html"));
});

app.get("/DashBoard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "DashBoard.html"));
});

//Post routes
app.post("/SignUp", (req, res) => {
  console.log(req.body);
  

  const userData = {
    username: `${req.body.name}`,
    email: `${req.body.email}`,
    password: `${req.body.password}`,
  };

  
    // const data = `${req.body.name}`;
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

app.post("/Login", (req, res) => {
  console.log(req.body);
  res.redirect("/DashBoard");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
