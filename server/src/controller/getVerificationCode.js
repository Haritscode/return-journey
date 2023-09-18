const generateOtp = require("../assets/optGenerator.assets");
const ErrorHandler = require("../config/ErrorHandler.config");
const OTP = require("../repo/opt.repo");


const getVerificationCode = async (req, res, next) => {
  const { contact } = req.params;
  const otp = generateOtp(6);
  try {
    const otpdata = new OTP();
    // check whether user has requested for opt within 1 Min
    const result=await otpdata.getOtpDetails(contact);
    if(!result){
      // request for the first time
      const result = await otpdata.storeOtp(otp, contact);
      if (result._id) {
        req.details={otp,contact};
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
        const result = await otpdata.storeOtp(otp, contact);
        if (result._id) {
          req.details={otp,contact};
          next();
        } 
      }
      else{
        // request within a min
        next(new ErrorHandler("too many requests",429))
      }
    }
  } catch (err) {
      next(new ErrorHandler());
    }
};
module.exports = getVerificationCode;
