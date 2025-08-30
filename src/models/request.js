const mongoose = require("mongoose");

const requestForm = new mongoose.Schema({
  
  user :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "donor",
    required: true,
  },

  bloodGroup: String,
  Units: Number,
  unitsFulfilled: {         
    type: Number,
    default: 0
  },
  location: String,
  hospital: String,
  contactNumber: Number,
  email : String,
  contactName:String,
  Reason: String,
  status: {
    type: String,
    enum: ["active", "fulfilled", "expired", "cancelled"],
    default : "active",
  },

  responders : [{
    donor : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "donor",
    },
    acceptedAt : {
      type : Date,
      default : Date.now,
    },    
  }]
},{timestamps : true});



requestForm.methods.isFulfilled = function(){
  return this.unitsFulfilled >= this.Units;
};


requestForm.methods.updateStatus = function (){
  if(this.isFulfilled()){
    this.status = "Fullfilled"
  }
  return this.save()
}

module.exports = mongoose.model('request',requestForm)
