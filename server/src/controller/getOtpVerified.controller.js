const ErrorHandler = require("../config/ErrorHandler.config");
const getOtpVerified = (req, res, next) => {
  try {
    // find user in otp database
    res.status(200).json({msg:"Otp verified"})
  } catch (err) {
    next(new ErrorHandler());
  }
};
module.exports = getOtpVerified;
