const OTP = require("../repo/opt.repo");
const getOtp = require("../assets/optGenerator.assets");
const ErrorHandler = require("../config/ErrorHandler.config");

const otpHandler = async (req, res, next) => {
  const otpdata = new OTP();
  const otp = getOtp(6);
  // check whether user has requested for opt within 1 Min
  const result = await otpdata.getOtpDetails(req.userId);
  if (!result) {
    // request for the first time
    const ip = req.ip;
    const result = await otpdata.saveOtp(otp, req.userId, ip);
    if (result._id) {
      req.otp = otp;
      next();
    }
  } else {
    // already request before
    const { updatedAt } = result;
    const dateObject = new Date(updatedAt);
    const second = dateObject.getTime();
    if (Date.now() - second > 60000) {
      // request after 1 min
      const ip = req.ip;
      const result = await otpdata.saveOtp(otp, req.userId, ip);
      if (result._id) {
        req.otp = otp;
        next();
      }
    } else {
      // request within a min
      next(new ErrorHandler("too many requests", 429));
    }
  }
};

module.exports=otpHandler;