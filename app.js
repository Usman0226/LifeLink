const express = require("express")
const path = require("path")
const fs = require("fs")
const ejs = require('ejs')

//jwt
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()

//Routes Modules
const getRouter = require("./Routes/getRoutes")
const postRouter = require("./Routes/postRoutes")

const app = express();
const PORT = 3001;

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())

//Routes
app.use(getRouter)
app.use(postRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/dashBoard`);
});

