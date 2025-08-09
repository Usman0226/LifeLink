const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    bloodGroup: String,
    AadharNo: Number,
    Location: String,
    dateOfBirth: String,
    refreshToken: String
});

module.exports = mongoose.model('User',userSchema)
