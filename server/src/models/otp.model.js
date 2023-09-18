const mongoose=require("mongoose");
const otpSchema=new mongoose.Schema({
    otp:{
        type:String,required:true
    },
    contact:{
        type:String, required:true, minLength:10, maxLength:14, index:{unique:true}
    },
},{timestamps:true})
module.exports=mongoose.model("otp",otpSchema);