const bcrypt = require("bcryptjs");
const Users=require("../repo/user.repo")
const ErrorHandler = require("../config/ErrorHandler.config");
const OTP = require("../repo/opt.repo");
const verifyOpt = async (req, res, next) => {
  const { otp, contact } = req.body;
  const otpObj = new OTP();
  const user=new Users();
  const userId=await user.getUserId(contact)
  const otpData = await otpObj.getOtpDetails(userId);
  if (otpData?._id) {
    
    // to verify the opt entered is valid or not
    bcrypt.compare(otp, otpData.otp, async(err, success) => {
      if (err) {

        // if error occured
        next(new ErrorHandler());
      } else {
        if (success) {

          // if otp is valid
          const { updatedAt } = otpData;
          const dateObject = new Date(updatedAt);
          const second = dateObject.getTime();

          //   to check otp is not expired i.e otp is valid till 10 mins
          if (Date.now() - second < 600000) {
          
            // otp verified
            const result=await otpObj.removeVerifiedOtp(userId);
            if (result.deletedCount > 0 && result.acknowledged) {
              next();
            }
            else{
              next(new ErrorHandler())
            }
          } else {
          
            // otp expired i.e after 10min
            next(new ErrorHandler("Otp Expired", 400));
          }
        } else {
          
          // otp entered by user is invalid
          next(new ErrorHandler("Incorrect Otp", 406));
        }
      }
    });
  } else {
    // no data exists
    next(new ErrorHandler("Invalid Otp", 404));
  }
};
module.exports = verifyOpt;
