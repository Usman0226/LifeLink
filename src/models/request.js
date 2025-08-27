const mongoose = require("mongoose");

const requestForm = new mongoose.Schema({
  
  user :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required: true,
  },

  bloodGroup: String,
  Units: Number,
  location: String,
  hospital: String,
  contactNumber: Number,
  email : String,
  contactName:String,
  Reason: String
},{timestamps : true});

module.exports = mongoose.model('request',requestForm)
