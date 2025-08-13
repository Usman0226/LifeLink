const mongoose = require("mongoose");

const requestForm = new mongoose.Schema({
  bloodGroup: String,
  Units: Number,
  location: String,
  hospital: String,
  contactNumber: Number,
  contactName:String,
  Reason: String
});

module.exports = mongoose.model('request',requestForm)
