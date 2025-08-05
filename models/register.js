const mongoose = require('mongoose');

const registerForm = mongoose.Schema({
    bloodGroup : String,
    location : String,
    contactName : String,
    contactInfo : Number,
})

module.exports = mongoose.model('register',registerForm)