const express = require("express")
const path = require("path")
const fs = require("fs")
const ejs = require('ejs')

//jwt
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()

//Routes Modules
const getRouter = require("./src/Routes/getRoutes")
const postRouter = require("./src/Routes/postRoutes")

const app = express();
const PORT = process.env.PORT || 4000 

app.set("view engine","ejs")
app.set('views',path.join(__dirname,'src','views'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join("public")))
app.use(cookieParser())


//Routes
app.use(getRouter)
app.use(postRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

