const mongoose = require('mongoose');

const connectDB = async ()=>{
  try{
    await mongoose.connect("mongodb://localhost:27017/UserData",{
      useNewUrlParser:true,
      useUnifiedTopology : true,
    });
    console.log("DB connected !");
    
  }
  catch(err){
    console.log("Db connection failed !");
    
  }
}

module.exports = connectDB
