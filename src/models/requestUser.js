const mongoose = require('mongoose')

const requestUsers = new mongoose.Schema({
    name : String,
    email : String,
    phone : Number,
},{timestamps : true})

module.exports =mongoose.model("requestUsers",requestUsers)    