const otpdb=require("../models/otp.model")
const bcrypt=require("bcryptjs");
class OTP{
    // store the otp details
    storeOtp(otp,contact){
        const hashOtp = bcrypt.hashSync(otp, bcrypt.genSaltSync());
        return otpdb.findOneAndUpdate({contact},{otp:hashOtp},{upsert:true,new:true})
    }

    // find contact in otp collection
    getOtpDetails(contact){
        return otpdb.findOne({contact});
    }
    // remove otp details
    removeVerifiedOtp(contact){
        return otpdb.deleteOne({contact})

    }
}
module.exports=OTP;