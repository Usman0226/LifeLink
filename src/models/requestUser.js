const mongoose = require('mongoose')

const requestUsers = mongoose.Schema({
    name : String,
    email : {
        type : String,
    },
    phone : Number,
},{Timestamp : true})

module.exports = requestUsers