const generateOtp = require("../assets/optGenerator.assets");
const ErrorHandler = require("../config/ErrorHandler.config");
const OTP = require("../repo/opt.repo");
const User=require("../repo/user.repo")

const genVerificationCode = async (req, res, next) => {
  const { contact } = req.params;
  const otp = generateOtp(6);
  try {
    const otpdata = new OTP();
    const user=new User();
    const userId=await user.getUserId(contact);
    if(userId?.id){
      // check whether user has requested for opt within 1 Min
      const result=await otpdata.getOtpDetails(userId);
      if(!result){
        // request for the first time
        const result = await otpdata.storeOtp(otp, userId);
        if (result._id) {
          req.otp=otp;
          next();
        }
      }
      else{
        // already request before
        const { updatedAt } = result;
        const dateObject = new Date(updatedAt);
        const second = dateObject.getTime();
        if(Date.now()-second>60000)
        {
          // request after 1 min
          const result = await otpdata.storeOtp(otp, userId);
          if (result._id) {
            req.otp=otp;
            next();
          } 
        }
        else{
          // request within a min
          next(new ErrorHandler("too many requests",429))
        }
      }
    }
    else{
      next(new ErrorHandler("user details not found",404))
    }
  } catch (err) {
      next(new ErrorHandler());
    }
};
module.exports = genVerificationCode;
