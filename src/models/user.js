const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    bloodGroup: String,
    phone: String,
    location: String,
    dateOfBirth: String,
    refreshToken: String
});

module.exports = mongoose.model('donor',userSchema)
