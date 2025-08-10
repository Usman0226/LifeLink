const mongoose = require('mongoose');

const connectDB = async ()=>{
  try{
    // await mongoose.connect("mongodb://localhost:27017/UserData");
    await mongoose.connect("mongodb+srv://chandanusmangani:UsmanGaniChandan@cluster0.uymtijb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("DB connected !");
    
  }
  catch(err){
    console.log("Db connection failed !");
    
  }
}

module.exports = connectDB
