const express = require("express");
const path = require("path");
const fs = require("fs");

//Routes
const getRouter = require("./Routes/getRoutes");
const postRouter = require("./Routes/postRoutes");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use(getRouter)
app.use(postRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
