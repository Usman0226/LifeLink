const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type : String,
        required : true,
    },
    password: String,
    bloodGroup: String,
    phone: String,
    location: String,
    dateOfBirth: String,
    refreshToken: String,
    role : {
        type : String,
        default : 'user',
        enum : ['user','donor']
    }
});

module.exports = mongoose.model('donor',userSchema)