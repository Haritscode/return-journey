const mongoose=require("mongoose");
const otpSchema=new mongoose.Schema({
    otp:{
        type:String,required:true
    },
    contact:{
        type:String, required:true, minLength:10, maxLength:14, index:{unique:true}
    },
},{timestamps:true})
otpSchema.index({updatedAt:1},{expireAfterSeconds:3600*24*3})
module.exports=mongoose.model("otp",otpSchema);