const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    bloodGroup: String,
    phone: Number,
    Location: String,
    dateOfBirth: String,
    refreshToken: String
});

module.exports = mongoose.model('User',userSchema)
