const twilio = require("twilio")
require("dotenv").config()

const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN
)

module.exports.sendSMS = async(to,message)=>{
    try{
        const response = await client.messages.create({
            body : message,
            from : process.env.TWILIO_PHONE_NUMBER ,to
        })
        console.log("sending to routes");
        
        return response;
    }catch(err){
        console.log("error sending the SMS",err)
    }
}