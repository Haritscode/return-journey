const otpdb=require("../models/otp.model")
const bcrypt=require("bcryptjs");
class OTP{
    // store the otp details
    storeOtp(otp,userId){
        const hashOtp = bcrypt.hashSync(otp, bcrypt.genSaltSync());
        return otpdb.findOneAndUpdate({userId},{otp:hashOtp},{upsert:true,new:true})
    }

    // find contact in otp collection
    getOtpDetails(userId){
        return otpdb.findOne({userId});
    }
    // remove otp details
    removeVerifiedOtp(userId){
        return otpdb.deleteOne({userId})
    }
}
module.exports=OTP;