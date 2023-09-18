const mongoose=require("mongoose");
const otpSchema=new mongoose.Schema({
    otp:{
        type:String,required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId, required:true, ref:"user",index:{unique:true}
    },
},{timestamps:true})
otpSchema.index({updatedAt:1},{expireAfterSeconds:3600*24})
module.exports=mongoose.model("otp",otpSchema);